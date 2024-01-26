'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { MenuPageParameters, MenuPageProperties } from '@/app/(AuthorizedLayout)/stores/menus/_models/parameters'
import { getMenus } from '@/app/(AuthorizedLayout)/stores/menus/_lib/getMenus'
import MenuSearchContainer from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuSearchContainer'
import MenuListTable from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuListTable'

const MenuListView = ({ pageParameters: initPageParameters }: MenuPageProperties) => {
  const [pageParameters, setPageParameters] = useState(initPageParameters)
  const [searchPageParameters, setSearchPageParameters] = useState(initPageParameters)
  const { page } = searchPageParameters

  const router = useRouter()
  const {
    data: menuPage,
    isError,
    error
  } = useQuery<Response, Error, Page<MenuResponse>, [_1: string, _2: string, pageParameters: MenuPageParameters]>({
    queryKey: ['stores', 'menus', pageParameters],
    queryFn: getMenus,
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

  const handlerRouter = (pageParameters: MenuPageParameters) => {
    const searchParams = new URLSearchParams(...Object.entries(pageParameters))
    router.push(`/menus?${searchParams.toString()}`)

    setPageParameters(pageParameters)
    setSearchPageParameters(pageParameters)
  }

  return (
    <>
      <BaseCard title="메뉴 목록">
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItem: 'center' }}>
          <Typography color="textSecondary" sx={{ fontSize: '1.25rem', fontWeight: '600' }}>
            진행중 : 0건
          </Typography>
        </Box>
        <MenuSearchContainer
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
        <MenuListTable page={page} menuPage={menuPage} handlerPageChange={handlerPageChange} />
      </BaseCard>
    </>
  )
}

export default MenuListView
