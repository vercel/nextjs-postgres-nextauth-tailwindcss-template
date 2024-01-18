import { auth } from '@/auth'

export const NO_AUTHORIZED = new Error("NO_AUTHORIZED")

export const getSessionToken = async () => {
  try {
    const session = await auth()
    if (session !== null) {
      return session.accessToken
    }
  } catch (error) {
    console.error("getSessionToken", error)
  }

  return Promise.reject(NO_AUTHORIZED)
}
