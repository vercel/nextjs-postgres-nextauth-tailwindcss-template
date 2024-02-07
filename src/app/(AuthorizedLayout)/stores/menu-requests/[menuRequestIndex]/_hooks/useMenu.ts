'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { useSession } from 'next-auth/react'
import { getMenu } from '@/app/(AuthorizedLayout)/stores/menus/[menuIndex]/_lib/getMenu'
import { MenuResponse } from '@/app/(AuthorizedLayout)/stores/menus/[menuIndex]/_models/response'

const useMenu = (menuIndex: number) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const {
    data: menu,
    isLoading,
    isError,
    error
  } = useQuery<Response, Error, MenuResponse, [_1: string, _2: string, menuIndex: number]>({
    queryKey: ['stores', 'menus', menuIndex],
    queryFn: getMenu,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })

  useEffect(() => {
    if (isError) {
      if (error.message === 'NO_AUTHORIZED') {
        router.replace(SIGN_OUT_PAGE_PATH)
      }
    }

    if (!isLoading && menu === undefined) {
      alert('메뉴 정보 조회에 실패하였습니다.')
      router.back()
    }
  }, [menu, isLoading, isError, error, router])

  return {
    menu: menu,
    session: session,
    isLoading: status === 'loading' || isLoading
  }
}

export default useMenu
