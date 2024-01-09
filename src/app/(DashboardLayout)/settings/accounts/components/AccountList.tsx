'use client'

import React, { ChangeEvent, useState } from 'react'
import {
  Button,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Page } from 'thunder-order'
import { AdminAccount } from 'thunder-order/accounts'
import AccountListItem from '@/app/(DashboardLayout)/settings/accounts/components/AccountListItem'
import Box from '@mui/material/Box'
import { signOut } from 'next-auth/react'

const accounts = [
  {
    id: '1',
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    priority: 'Low',
    pbg: 'primary.main',
    budget: '3.9',
  },
  {
    id: '2',
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    priority: 'Medium',
    pbg: 'secondary.main',
    budget: '24.5',
  },
  {
    id: '3',
    name: 'Christopher Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    priority: 'High',
    pbg: 'error.main',
    budget: '12.8',
  },
  {
    id: '4',
    name: 'Nirav Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    priority: 'Critical',
    pbg: 'success.main',
    budget: '2.4',
  },
]

const AccountList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get('page')) || 1,
  )
  const handlerPageChange = (
    event: ChangeEvent<unknown>,
    page: number,
  ): void => {
    setPageNumber(page)
  }

  const pageSize = 50

  const queryKey = `/api/accounts?page=${pageNumber}&size=${pageSize}`
  const { data: accountPage } = useQuery<
    { data: Page<AdminAccount> },
    unknown,
    Page<AdminAccount>
  >({
    queryKey: [queryKey],
    queryFn: () =>
      fetch(`/api/accounts?page=${pageNumber}&size=${pageSize}`).then(
        (response) => {
          if (response.status == 401) {
            return Promise.reject(new Error())
          }
          return response.json()
        },
      ),
    select: (json) => json.data,
  })

  return (
    <BaseCard
      title="관리자 계정 관리"
      action={
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            router.push(
              `/settings/accounts/register?callback=${encodeURI(queryKey)}`,
            )
          }
        >
          등록하기
        </Button>
      }
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: 'calc(100vh - 300px)',
        }}
      >
        <TableContainer
          sx={{
            minHeight: '500px',
            width: {
              xs: '274px',
              sm: '100%',
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
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
              {accountPage &&
                accountPage.contents.map((account) => (
                  <AccountListItem key={account.id} account={account} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={accountPage?.pages}
          page={pageNumber}
          onChange={handlerPageChange}
          shape="rounded"
          variant="outlined"
          sx={{
            marginTop: '20px;',
          }}
        />
      </Container>
    </BaseCard>
  )
}

export default AccountList
