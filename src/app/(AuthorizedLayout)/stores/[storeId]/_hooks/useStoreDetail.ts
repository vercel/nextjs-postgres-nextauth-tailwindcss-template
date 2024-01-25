'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'
import { getStoreDetail } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/getStoreDetail'
import { useEffect } from 'react'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { useSession } from 'next-auth/react'

const useStoreDetail = (storeId: string) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const {
    data: storeDetail,
    isLoading,
    isError,
    error
  } = useQuery<Response, Error, StoreDetailResponse, [_1: string, _2: string, storeId: string]>({
    queryKey: ['stores', 'detail', storeId],
    queryFn: getStoreDetail,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })

  useEffect(() => {
    if (isError) {
      if (error.message === 'NO_AUTHORIZED') {
        router.replace(SIGN_OUT_PAGE_PATH)
      }
    }

    if (!isLoading && storeDetail === undefined) {
      alert('매장 정보 조회에 실패하였습니다.')
      router.back()
    }
  }, [storeDetail, isLoading, isError, error, router])

  console.log('storeDetail', storeDetail)
  return {
    storeDetail: storeDetail,
    session: session,
    isLoading: status === 'loading' || isLoading
  }
}

export default useStoreDetail
