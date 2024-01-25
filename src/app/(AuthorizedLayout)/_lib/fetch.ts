import { ACCESS_TOKEN_HEADER } from '@/auth'
import { Session } from 'next-auth'

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

export const clientMultipartFetch = async (
  version: string,
  path: string,
  requestInit: RequestInit,
  session?: Session | null
) => {
  console.log('clientMultipartFetch', version, path, requestInit, session)
  return await fetch(
    `/server-api/${version}/admin${path}`, {
      headers: {
        Authorization: `${ACCESS_TOKEN_HEADER}${session?.accessToken}`
      },
      ...requestInit
    }
  )
}
