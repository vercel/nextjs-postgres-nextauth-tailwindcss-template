import { ACCESS_TOKEN_HEADER } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import { ResponseData } from 'thunder-order'

interface FetchType {
  version: string
  path: string
  token: string
  body?: any
}

interface RequestHeaderType {
  token: string
  method: string
}

const serverUrl = (version: string, path: string) =>
  `${process.env.SERVER_URL}/api/${version}/admin${path}`

export const getFetch = async ({ version, path, token }: FetchType) =>
  await fetch(serverUrl(version, path), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${ACCESS_TOKEN_HEADER}${token}`,
    },
  })
    .then((response) => responseJson(response))
    .catch((error) => console.error('Server API Error', error))

export const postFetch = async ({ version, path, token, body }: FetchType) =>
  await fetch(serverUrl(version, path), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${ACCESS_TOKEN_HEADER}${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => responseJson(response))
    .catch((error) => console.error('Server API Error', error))

export const headers = ({ token, method }: RequestHeaderType) => ({
  Accept: 'application/json',
  Authorization: `${ACCESS_TOKEN_HEADER}${token}`,
  method: method,
})

export const responseJson = (response: Response) => {
  if (!response.ok) {
    return Promise.resolve({
      resultCode: response.status,
      message: response.statusText,
    })
  }
  return response.json()
}

export const ok = (responseData: ResponseData<any>) => {
  if (Number(responseData.resultCode) == 401) {
    return noAuthorizationError()
  }

  return NextResponse.json(
    {
      data: responseData.data,
      message: 'OK',
    },
    { status: 200 },
  )
}

export const created = (responseData: ResponseData<any>) => {
  if (responseData.resultCode === '401') {
    return noAuthorizationError()
  }

  return NextResponse.json(
    {
      data: responseData.data,
      message: 'Created',
    },
    { status: 201 },
  )
}

export const badRequestError = (message: string) =>
  NextResponse.json({ error: message }, { status: 400 })
export const noAuthorizationError = () =>
  NextResponse.json({ error: 'No Authorization' }, { status: 401 })
export const internalServerError = (error: Error) =>
  NextResponse.json({ error: error }, { status: 500 })
