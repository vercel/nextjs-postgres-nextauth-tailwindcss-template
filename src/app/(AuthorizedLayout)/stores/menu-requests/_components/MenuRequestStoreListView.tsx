'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import {
  MenuRequestStorePageParameters,
  MenuRequestStorePageProperties
} from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/parameters'
import { getMenuRequestStores } from '@/app/(AuthorizedLayout)/stores/menu-requests/_lib/getMenuRequestStores'
import MenuRequestStoreSearchContainer
  from '@/app/(AuthorizedLayout)/stores/menu-requests/_components/MenuRequestStoreSearchContainer'
import MenuRequestStoreListTable from '@/app/(AuthorizedLayout)/stores/menu-requests/_components/MenuRequestStoreListTable'

const MenuRequestStoreListView = ({
  pageParameters: initPageParameters
}: MenuRequestStorePageProperties) => {
  const [pageParameters, setPageParameters] = useState(initPageParameters)
  const [searchPageParameters, setSearchPageParameters] = useState(initPageParameters)
  const { page } = searchPageParameters

  const router = useRouter()
  const {
    data: menuRequestStorePage,
    isError,
    error
  } = useQuery<Response, Error, Page<MenuRequestStoreListResponse>, [_1: string, _2: string, pageParameters: MenuRequestStorePageParameters]>({
    queryKey: ['stores', 'menu-requests', pageParameters],
    queryFn: getMenuRequestStores,
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

  const handlerRouter = (pageParameters: MenuRequestStorePageParameters) => {
    const searchParams = new URLSearchParams(pageParameters as any)
    router.push(`/stores/menu-requests?${searchParams.toString()}`)

    setPageParameters(pageParameters)
    setSearchPageParameters(pageParameters)
  }

  return (
    <>
      <BaseCard title="메뉴 승인">
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItem: 'center' }}>
          <Typography color="textSecondary" sx={{ fontSize: '1.25rem', fontWeight: '600' }}>
            진행중 : 0건
          </Typography>
        </Box>
        <MenuRequestStoreSearchContainer
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
        <MenuRequestStoreListTable
          page={page}
          menuRequestStorePage={menuRequestStorePage}
          handlerPageChange={handlerPageChange}
        />
      </BaseCard>
    </>
  )
}

export default MenuRequestStoreListView
