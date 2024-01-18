'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { SIGN_IN_PAGE_PATH } from '@/auth'

const Page = () => {
  const router = useRouter()

  signOut({ redirect: false })
    .then((response) => {
      console.log(`response:${response}`)
      router.replace(SIGN_IN_PAGE_PATH)
    })
    .catch((error) => {
      console.log(`error:${error}`)
    })

  return null
}

export default Page
