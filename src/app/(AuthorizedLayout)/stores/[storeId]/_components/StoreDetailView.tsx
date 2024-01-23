'use client'

import React, { useEffect } from 'react'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getStoreDetail } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/getStoreDetail'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeDetail'
import styles from './storeDetail.module.css'
import StoreInfoContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreInfoContainer'
import StoreManagerContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreManagerContainer'
import StoreBusinessContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreBusinessContainer'
import StoreMenuContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreMenuContainer'

type Props = {
  storeId: string
}

const StoreDetailView = ({ storeId }: Props) => {
  const router = useRouter()
  const {
    data: storeDetail,
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
  }, [isError])

  if (storeDetail == null) {
    return null
  }
  console.dir(storeDetail)

  return (
    <>
      <BaseCard
        title="매장 상세 정보"
        action={
          <BasicButton
            label={'삭제'}
            disabled={false}
            onClick={() => {
              router.push(`/stores/register`)
            }}
          />
        }
      >
        <Container className={styles.container}>
          <StoreInfoContainer storeDetail={storeDetail} handlerEdit={() => {}} />
          <StoreManagerContainer storeDetail={storeDetail} handlerEdit={() => {}} />
          <StoreBusinessContainer storeDetail={storeDetail} handlerEdit={() => {}} />
          <StoreManagerContainer storeDetail={storeDetail} handlerEdit={() => {}} />
          <StoreMenuContainer storeDetail={storeDetail} handleRouter={() => {}} />
          <BasicButton
            label={'비밀번호 변경'}
            disabled={false}
            onClick={() => {
              router.push(`/stores/${storeId}/password`)
            }}
          />
        </Container>
      </BaseCard>
    </>
  )
}

export default StoreDetailView
