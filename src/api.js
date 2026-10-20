import axios from 'axios';

let csrfToken = '';
const api = axios.create({ baseURL: '/api', timeout: 15000 });
api.defaults.headers.common['X-LibraTech-Request'] = '1';

if (typeof window !== 'undefined' && window.location.hostname.toLowerCase().endsWith('.manus.computer')) {
  api.defaults.headers.common['X-LibraTech-Preview'] = '1';
}

api.interceptors.request.use((config) => {
  const method = String(config.method || 'get').toUpperCase();
  if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});

export function setCsrfToken(token) {
  csrfToken = typeof token === 'string' ? token : '';
}

export function clearCsrfToken() {
  csrfToken = '';
}

export default api;
