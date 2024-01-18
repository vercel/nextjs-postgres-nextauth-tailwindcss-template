import { ACCESS_TOKEN_HEADER } from '@/auth'
import { getSessionToken } from '@/app/(AuthorizedLayout)/_lib/session'
import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import { ResponseData } from '@/models/common'

export const serverFetch = async (
  version: string,
  path: string,
  requestInit: RequestInit
) => {
  console.log('serverFetch', version, path, requestInit)
  const accessToken = await getSessionToken()
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${version}/admin${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${ACCESS_TOKEN_HEADER}${accessToken}`
      },
      ...requestInit
    }
  )

  return responseBody(response)
}

export const clientFetch = async (
  version: string,
  path: string,
  requestInit: RequestInit,
  session?: Session | null
) => {
  console.log('clientFetch', version, path, requestInit, session)
  return await fetch(
    `/server-api/${version}/admin${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${ACCESS_TOKEN_HEADER}${session?.accessToken}`
      },
      ...requestInit
    }
  )
}

export const responseBody = async (response: Response) => {
  if (response.status === 401) {
    return NextResponse.json({ error: 'No Authorization' }, { status: 401 })
  }

  if (!response.ok) {
    return NextResponse.json({ error: 'Get Data Fetch Error' }, { status: 500 })
  }

  const json: ResponseData<Object> = await response.json()
  return NextResponse.json(
    json.data,
    { status: 200 }
  )
}
