import { getSessionToken } from '@/app/(AuthorizedLayout)/_lib/session'
import { ACCESS_TOKEN_HEADER } from '@/auth'
import { NextResponse } from 'next/server'
import { ResponseData } from '@/app/(AuthorizedLayout)/_models/common'

export const serverFetch = async (
  path: string,
  requestInit: RequestInit
) => {
  console.log('serverFetch', path, requestInit)
  const accessToken = await getSessionToken()
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin${path}`, {
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

export const serverFileFetch = async (
  path: string,
  requestInit: RequestInit
) => {
  console.log('serverFileFetch', path, requestInit)
  const accessToken = await getSessionToken()
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin${path}`, {
      method: 'GET',
      headers: {
        'Authorization': `${ACCESS_TOKEN_HEADER}${accessToken}`
      },
      ...requestInit
    }
  )


  return response.blob()
}

const responseBody = async (response: Response) => {
  if (response.status === 401) {
    return NextResponse.json({ message: 'NO_AUTHORIZED' }, { status: 401 })
  }

  if (!response.ok) {
    return NextResponse.json({ message: 'FETCH_ERROR' }, { status: 500 })
  }

  const json: ResponseData<Object> = await response.json()
  return NextResponse.json(
    json.data,
    { status: 200 }
  )
}
