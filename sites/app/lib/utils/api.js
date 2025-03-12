import { API_STATUSES } from '../constants/index.js';

import { publishClientLogs } from './index.js';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const defaultFetchOptions = {
  GET: {
    method: 'GET',
    headers: defaultHeaders,
  },
  POST: {
    method: 'POST',
    headers: defaultHeaders,
  },
  PUT: {
    method: 'PUT',
    headers: defaultHeaders,
  },
  DELETE: {
    method: 'DELETE',
    headers: defaultHeaders,
  },
};

const servicesURLs = {
  // 'next' refers to internal Next.js /api/ routes
  users: {
    server: process.env.API_USERS_URL,
    client: process.env.NEXT_PUBLIC_NEXTJS_API_USERS_URL,
  },
  auth: {
    server: process.env.API_AUTH_URL,
    client: process.env.NEXT_PUBLIC_NEXTJS_API_AUTH_URL,
  },
  orders: {
    server: process.env.API_ORDERS_URL,
    client: process.env.NEXT_PUBLIC_NEXTJS_API_ORDERS_URL,
  },
  products: {
    server: process.env.API_PRODUCTS_URL,
    client: process.env.NEXT_PUBLIC_NEXTJS_API_PRODUCTS_URL,
  },
};

const isServerSide = () => typeof window === 'undefined';

const apiUrl = ({inUrl, service}) => {
  if (!service) {
    return inUrl; //external api call - not from us
  }

  const base = isServerSide()
    ? servicesURLs[service]
      ? servicesURLs[service].server
      : process.env.NEXT_PUBLIC_NEXTJS_API_URL
    : servicesURLs[service]
      ? servicesURLs[service].client
      : process.env.NEXT_PUBLIC_NEXTJS_API_URL;

  return `${base}`;
};

/**
 * On the server side next-logger writes console logs to a proper logs format under the hood
 * On the client side we need to call /api/logs API to write logs because logger doesn`t work on the client side
 */
const reportLogs = (message) => {
  if (isServerSide) {
    console.debug(message);
  } else {
    publishClientLogs(message);
  }
};

const handleResponse = async (resp, ctx) => {
  const contentType = resp.headers.get('content-type');
  const contentLength = resp.headers.get('content-length');

  if (contentLength === '0') return { ok: resp.ok, status: resp.status };

  let parseMethod = 'text';
  if (
    contentType &&
    (contentType.indexOf('application/json') !== -1 ||
      contentType.indexOf('application/hal+json') !== -1 ||
      contentType.indexOf('application/problem+json') !== -1)
  ) {
    parseMethod = 'json';
  }

  const data = await resp[parseMethod]();

  // if we have a context object, apply any set-cookie header to the res
  if (ctx?.res) {
    try {
      const setCookie = resp.headers.getSetCookie();
      if (setCookie.length) {
        ctx.res.setHeader('Set-Cookie', setCookie);
      }
    } catch (err) {
      reportLogs(err);
    }
  }

  return { ok: resp.ok, status: resp.status, data };
};

const handleError = (error) => {
  reportLogs(error);

  return { status: API_STATUSES.SERVER_ERROR, error };
};

const apiFetch = async ({url, options = {}, mockData}) => {
  const { service } = options;
  console.log('apiFetch: ', url, options);
  const fetchUrl = apiUrl({ url, service });
  options.headers = { ...defaultFetchOptions[options?.method || 'GET'].headers, ...options.headers };

  const { ctx, ...fetchOptions } = {
    ...defaultFetchOptions[options?.method || 'GET'],
    ...options,
  };

  const { timeout = false } = options;
  let timeoutId;
  if (timeout) {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), timeout);
    fetchOptions.signal = controller.signal;
  }
  console.log('\n\nfetchOptions: ', fetchUrl, fetchOptions);
  const response = await fetch(fetchUrl, fetchOptions)
    .then((resp) => handleResponse(resp, ctx))
    .catch((error) => handleError(error, mockData));

  if (timeout) clearTimeout(timeoutId);

  return response;
};

export { apiFetch, apiUrl, defaultFetchOptions, reportLogs };