// import { db, products } from 'lib/db';
import { NextResponse } from 'next/server';
import { apiFetch } from '@/lib/utils/api.js';
import { headers as getHeaders } from 'next/headers.js';


export const dynamic = 'force-dynamic';

const usersFetchOptions = {
  service: 'users',
  credentials: 'include',
};

export const GET = async (req, { params }) => {
  try {
    const options = { ...usersFetchOptions, method: 'GET' };
    const clientHeaders = getHeaders();

    // Pass client headers along with your fetch options
    options.headers = {
      ...Object.fromEntries(clientHeaders) // Convert headers from Map to plain object
    };

    const response = await apiFetch({options});
    const updatedResponse = { ...response };

    if (!response.ok) {
      console.log(response);
    }

    return NextResponse.json(updatedResponse.data || [], { status: updatedResponse.status });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: 'Request failed' }, { status: API_STATUSES.SERVER_ERROR });
  }
};
