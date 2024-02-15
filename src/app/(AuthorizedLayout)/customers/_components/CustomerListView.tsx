'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { CustomerPageParameters, CustomerPageProperties } from '@/app/(AuthorizedLayout)/customers/_models/props'
import { CustomerResponse } from '@/app/(AuthorizedLayout)/customers/_models/response'
import { getCustomers } from '@/app/(AuthorizedLayout)/customers/_lib/getCustomers'
import CustomerSearchContainer from '@/app/(AuthorizedLayout)/customers/_components/CustomerSearchContainer'
import CustomerListTable from '@/app/(AuthorizedLayout)/customers/_components/CustomerListTable'

const CustomerListView = ({ pageParameters: initPageParameters }: CustomerPageProperties) => {
  const [pageParameters, setPageParameters] = useState(initPageParameters)
  const [searchPageParameters, setSearchPageParameters] = useState(initPageParameters)
  const { page } = searchPageParameters

  const router = useRouter()
  const {
    data: customerPage,
    isError,
    error
  } = useQuery<Response, Error, Page<CustomerResponse>, [_1: string, pageParameters: CustomerPageParameters]>({
    queryKey: ['customers', pageParameters],
    queryFn: getCustomers,
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

  const handlerRouter = (pageParameters: CustomerPageParameters) => {
    const searchParams = new URLSearchParams(pageParameters as any)
    router.push(`/customers?${searchParams.toString()}`)

    setPageParameters(pageParameters)
    setSearchPageParameters(pageParameters)
  }

  return (
    <>
      <BaseCard title="사용자 목록">
        <CustomerSearchContainer
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
        <CustomerListTable
          page={page}
          customerPage={customerPage}
          handlerPageChange={handlerPageChange}
          handlerModifyIdLink={(customerId) => {
            router.push(`/customers/${customerId}/id`)
          }}
        />
      </BaseCard>
    </>
  )
}

export default CustomerListView
