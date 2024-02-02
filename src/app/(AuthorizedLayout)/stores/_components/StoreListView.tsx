'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { StorePageProperties, StorePageParameters } from '@/app/(AuthorizedLayout)/stores/_models/props'
import StoreSearchContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchContainer'
import StoreListTable from '@/app/(AuthorizedLayout)/stores/_components/StoreListTable'
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getStores } from '@/app/(AuthorizedLayout)/stores/_lib/getStores'
import { StoreResponse } from '@/app/(AuthorizedLayout)/stores/_models/response'

const StoreListView = ({ pageParameters: initPageParameters }: StorePageProperties) => {
  const [pageParameters, setPageParameters] = useState(initPageParameters)
  const [searchPageParameters, setSearchPageParameters] = useState(initPageParameters)
  const { page } = searchPageParameters

  const router = useRouter()
  const {
    data: storePage,
    isError,
    error
  } = useQuery<Response, Error, Page<StoreResponse>, [_1: string, pageParameters: StorePageParameters]>({
    queryKey: ['stores', pageParameters],
    queryFn: getStores,
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

  const handlerPageChange = (
    event: ChangeEvent<unknown>,
    page: number,
  ): void => {
    setPageParameters((prev) => ({
      ...prev,
      page: page
    }))
    handlerRouter(pageParameters)
  }

  const handlerRouter = (pageParameters: StorePageParameters) => {
    const searchParams = new URLSearchParams(...Object.entries(pageParameters))
    router.push(`/stores?${searchParams.toString()}`)

    setPageParameters(pageParameters)
    setSearchPageParameters(pageParameters)
  }

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
        <StoreSearchContainer
          pageParameters={searchPageParameters}
          setPageParameters={setSearchPageParameters}
          handlerRouter={handlerRouter}
        />
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
