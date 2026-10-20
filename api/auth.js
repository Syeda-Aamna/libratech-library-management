import { Router } from 'express';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const router = Router();
const cookieName = 'libratech_staff_session';
const sessionLifetime = 12 * 60 * 60 * 1000;
const attempts = new Map();

function sessionSecret() { return process.env.SESSION_SECRET || ''; }
function sign(payload) { return createHmac('sha256', sessionSecret()).update(payload).digest('base64url'); }
function sessionToken(email, csrfToken) {
  const payload = Buffer.from(JSON.stringify({ email, csrfToken, expires: Date.now() + sessionLifetime })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}
function validSession(token) {
  if (!token || sessionSecret().length < 32) return null;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return null;
  const expected = Buffer.from(sign(payload));
  const supplied = Buffer.from(signature);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.email && typeof data.csrfToken === 'string' && data.csrfToken.length >= 32 && data.expires > Date.now() ? data : null;
  } catch { return null; }
}
function cookieOptions(req) {
  const preview = req.get('x-libratech-preview') === '1' || process.env.PUBLIC_HTTPS_PREVIEW === 'true';
  const localHttp = ['localhost', '127.0.0.1', '::1'].includes(String(req.hostname || '').toLowerCase()) && !preview;
  return {
    httpOnly: true,
    secure: preview || !localHttp,
    sameSite: preview ? 'none' : 'lax',
    path: '/',
    maxAge: sessionLifetime,
  };
}
function readCookie(req) {
  const entry = (req.headers.cookie || '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`));
  if (!entry) return '';
  try { return decodeURIComponent(entry.slice(cookieName.length + 1)); } catch { return ''; }
}
function equalSecret(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}
function csrfMatches(req, session) {
  return Boolean(session?.csrfToken) && equalSecret(req.get('x-csrf-token') || '', session.csrfToken);
}
function rateLimited(ip) {
  const now = Date.now();
  const state = attempts.get(ip);
  if (!state || state.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  state.count += 1;
  return state.count > 8;
}

router.get('/session', (req, res) => {
  const session = validSession(readCookie(req));
  res.json({
    authenticated: Boolean(session),
    role: session ? 'admin' : null,
    email: session?.email || null,
    csrfToken: session?.csrfToken || null,
  });
});

router.post('/admin/login', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const ip = req.ip || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many sign-in attempts. Wait 15 minutes and try again.' });
  const expectedEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const expectedPassword = String(process.env.ADMIN_PASSWORD || '');
  if (sessionSecret().length < 32 || !expectedEmail || !expectedPassword) {
    return res.status(503).json({ error: 'Administrator sign-in is not configured yet.' });
  }
  if (!equalSecret(email, expectedEmail) || !equalSecret(password, expectedPassword)) {
    return res.status(401).json({ error: 'The email or password is incorrect.' });
  }
  attempts.delete(ip);
  const csrfToken = randomBytes(32).toString('base64url');
  res.cookie(cookieName, sessionToken(expectedEmail, csrfToken), cookieOptions(req));
  res.json({ authenticated: true, role: 'admin', email: expectedEmail, csrfToken });
});

router.post('/logout', (req, res) => {
  const session = validSession(readCookie(req));
  if (session && !csrfMatches(req, session)) {
    return res.status(403).json({ error: 'The security token is missing or invalid. Reload and try again.' });
  }
  const { maxAge: _maxAge, ...options } = cookieOptions(req);
  res.clearCookie(cookieName, options);
  res.json({ ok: true });
});

export function requireAdmin(req, res, next) {
  const session = validSession(readCookie(req));
  if (!session) return res.status(401).json({ error: 'Administrator sign-in is required.' });
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && !csrfMatches(req, session)) {
    return res.status(403).json({ error: 'The security token is missing or invalid. Reload and try again.' });
  }
  req.admin = { email: session.email };
  next();
}

export default router;
