import { getSessionToken } from '@/app/(AuthorizedLayout)/_lib/session'
import { ACCESS_TOKEN_HEADER } from '@/auth'
import { NextResponse } from 'next/server'
import { ResponseData } from '@/app/(AuthorizedLayout)/_models/common'

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
