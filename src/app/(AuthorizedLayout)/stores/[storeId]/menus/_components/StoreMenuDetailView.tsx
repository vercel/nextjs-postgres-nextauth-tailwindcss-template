'use client'

import BaseCard from '@/app/_components/BaseCard'
import { useRouter } from 'next/navigation'
import { Container } from '@mui/material'
import styles from './storeMenuDetail.module.css'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import StoreInfoContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreInfoContainer'
import StoreMenuListTable from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreMenuListTable'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { getStoreMenuDetails } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_lib/getStoreMenuDetails'

const StoreMenuDetailView = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, isLoading } = useStoreDetail(storeId)

  const {
    data: menus,
    isLoading: isMenuLoading,
    isError,
    error
  } = useQuery<Response, Error, StoreMenuDetailResponse[], [_1: string, _2: string, storeId: string]>({
    queryKey: ['stores', 'menus', storeId],
    queryFn: getStoreMenuDetails,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })

  useEffect(() => {
    if (isError) {
      if (error.message === 'NO_AUTHORIZED') {
        router.replace(SIGN_OUT_PAGE_PATH)
      }
    }
  }, [isError, error, router])

  if (isLoading || storeDetail === undefined || isMenuLoading || menus === undefined) {
    return <Loading />
  }

  return (
    <>
      <BaseCard title="메뉴 상세 정보">
        <Container className={styles.container}>
          <StoreInfoContainer
            storeDetail={storeDetail}
            handleRegister={() => {
              router.push(`/stores/${storeId}/menus/register`)
            }}
          />
          <StoreMenuListTable menus={menus}/>
        </Container>
      </BaseCard>
    </>
  )
}

export default StoreMenuDetailView
