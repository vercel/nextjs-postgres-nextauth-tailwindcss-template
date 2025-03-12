import { apiFetch } from '@/lib/utils/api.js';

const getUserInfo = async (session) => {

  const options = {
    service: 'users',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  };
    return await apiFetch({ options });
}

const login = async ({ timeout = false, ...details }) => {
  const options = {
    service: 'auth',
    method: 'POST',
    body: JSON.stringify(details),
    credentials: 'include',
    timeout,
  };
  console.log('options: ', options);
  return await apiFetch({ options });
};

export { getUserInfo, login };