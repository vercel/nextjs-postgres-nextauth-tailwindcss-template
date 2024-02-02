import { ACCESS_TOKEN_HEADER } from '@/auth'
import { Session } from 'next-auth'

export const clientFetch = async (
  path: string,
  requestInit: RequestInit,
  session?: Session | null
) => {
  console.log('clientFetch', path, requestInit, session)
  return await fetch(
    `/server-api${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${ACCESS_TOKEN_HEADER}${session?.accessToken}`
      },
      ...requestInit
    }
  )
}

export const clientMultipartFetch = async (
  path: string,
  requestInit: RequestInit,
  session?: Session | null
) => {
  console.log('clientMultipartFetch', path, requestInit, session)
  return await fetch(
    `/server-api${path}`, {
      headers: {
        Authorization: `${ACCESS_TOKEN_HEADER}${session?.accessToken}`
      },
      ...requestInit
    }
  )
}
