"use client"
import { Button } from '@easeful/components';
import { apiFetch } from '@/lib/utils/api.js';
import { getUserInfo } from '@/lib/apiCalls/users.js';
import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function TestClient(props) {
  const [error, setError] = useState(null);
  const { data: session, status } = useSession(); // Access session data and status


  const buttonClick = async (e) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      redirect: false,
      user_name: 'Ghitza',
      password: '12345678',
    });

    if (!response.ok) {
      setError('Invalid email or password.');
    } else {
      // Redirect or perform other actions upon successful login
      console.log('Logged in successfully');
    }

    const response1  = await getUserInfo(session);
    console.log('Users api: ', response1);
  };
  return (
    <div>
      <Button onClick={buttonClick}>Test Api {error}</Button>
    </div>
  );
}
