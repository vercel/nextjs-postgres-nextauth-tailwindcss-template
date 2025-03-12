import { apiUrl } from './api.js';

export const publishClientLogs = (message, level) =>
  fetch(apiUrl(process.env.NEXT_PUBLIC_NEXTJS_API_LOGS_URL), {
    method: 'POST',
    body: JSON.stringify({ message, level }),
  });
