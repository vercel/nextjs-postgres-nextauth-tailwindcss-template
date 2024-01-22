'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { StoreResponse, StorePageProperties } from '@/app/(AuthorizedLayout)/stores/_models/store'
import StoreSearchContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchContainer'
import StoreListTable from '@/app/(AuthorizedLayout)/stores/_components/StoreListTable'
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { Box, Typography } from '@mui/material'

const StoreListView = ({ pageParameters: initPageParameters }: StorePageProperties) => {
  const [pageParameters, setPageParameters] = useState(initPageParameters)
  const { page } = pageParameters

  const router = useRouter()
  const isError = false
  const error = { message: '' }
  const storePage = { pages: 1, elements: 0, contents: [] } as Page<StoreResponse>
  // const {
  //   data: storePage,
  //   isError,
  //   error
  // } = useQuery<Response, Error, Page<Store>, [_1: string, pageParameters: StorePageParameters]>({
  //   queryKey: ['stores', pageParameters],
  //   queryFn: getStores,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // })

  useEffect(() => {
    if (isError) {
      if (error.message === 'NO_AUTHORIZED') {
        router.replace(SIGN_OUT_PAGE_PATH)
      }
    }
  }, [isError])

  const handlerPageChange = (
    event: ChangeEvent<unknown>,
    page: number,
  ): void => {
    const searchParams = new URLSearchParams(...Object.entries(pageParameters))
    router.push(`/stores?${searchParams.toString()}`)
    setPageParameters((prev) => ({
      ...prev,
      page: page
    }))
  }

  console.log(pageParameters)
  return (
    <>
      <BaseCard
        title="매장 목록"
        action={
          <BasicButton
            label={'매장 등록'}
            disabled={false}
            onClick={() => {
              router.push(`/stores/register`)
            }}
          />
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItem: 'center' }}>
          <Typography color="textSecondary" sx={{ fontSize: '1.25rem', fontWeight: '600' }}>
            진행중 : 0건
          </Typography>
        </Box>
        <StoreSearchContainer pageParameters={pageParameters} setPageParameters={setPageParameters} />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItem: 'center' }}>
          <BasicButton
            label={'다운로드'}
            disabled={false}
            onClick={() => {}}
            sx={{ width: '100px' }}
          />
        </Box>
        <StoreListTable page={page} storePage={storePage} handlerPageChange={handlerPageChange} />
      </BaseCard>
    </>
  )
}

export default StoreListView
