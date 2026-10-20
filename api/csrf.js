const mutatingMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export default function csrfGuard(req, res, next) {
  if (!mutatingMethods.has(req.method)) return next();
  if (req.get('x-libratech-request') !== '1') {
    return res.status(403).json({ error: 'This action must come from the LibraTech application.' });
  }
  next();
}
