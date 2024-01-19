'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { Page, PageParameters, PageProperties, ResponseData } from '@/app/(AuthorizedLayout)/_models/common'
import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { AdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_models/AdminAccount'
import { useQuery } from '@tanstack/react-query'
import { getAdminAccounts } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/getAdminAccounts'
import { useRouter } from 'next/navigation'
import AdminAccountListItem from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountListItem'
import { SIGN_IN_PAGE_PATH, SIGN_OUT_PAGE_PATH } from '@/auth'

const AdminAccountListView = ({ pageParameters }: PageProperties) => {
  const [page, setPage] = useState(pageParameters.page)

  const router = useRouter()
  const {
    data: adminAccountPage,
    isError,
    error
  } = useQuery<Response, Error, Page<AdminAccount>, [_1: string, pageParameters: PageParameters]>({
    queryKey: ['admin-accounts', { page: page }],
    queryFn: getAdminAccounts,
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

  const handlerPageChange = (
    event: ChangeEvent<unknown>,
    page: number,
  ): void => {
    router.push(`/admin-accounts?page=${page}`)
    setPage(page)
  }

  return (
    <>
      <BaseCard
        title="관리자 계정 관리"
        action={
          <BasicButton
            label={'등록하기'}
            disabled={false}
            onClick={() => {
              router.push(`/admin-accounts/register`)
            }}
          />
        }
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: 'calc(100vh - 300px)'
          }}
        >
          <TableContainer
            sx={{
              minHeight: '500px',
              width: {
                xs: '274px',
                sm: '100%'
              }
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: 'nowrap',
                mt: 2
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      등록/수정일
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      이름
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      연락처
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminAccountPage && adminAccountPage?.contents.map((adminAccount) => (
                  <AdminAccountListItem
                    key={adminAccount.id}
                    adminAccount={adminAccount}
                    onModifyClick={() => {
                      router.push(`/admin-accounts/${adminAccount.id}/modify`)
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            shape="rounded"
            variant="outlined"
            sx={{
              marginTop: '20px;'
            }}
            count={adminAccountPage?.pages}
            page={page}
            onChange={handlerPageChange}
          />
        </Container>
      </BaseCard>
    </>
  )
}

export default AdminAccountListView
