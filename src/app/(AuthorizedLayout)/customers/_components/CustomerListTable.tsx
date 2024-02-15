import React, { ChangeEvent } from 'react'
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
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { CustomerResponse } from '@/app/(AuthorizedLayout)/customers/_models/response'
import CustomerListItem from '@/app/(AuthorizedLayout)/customers/_components/CustomerListItem'

type Props = {
  page: number,
  customerPage: Page<CustomerResponse> | undefined,
  handlerPageChange: (
    event: ChangeEvent<unknown>,
    page: number
  ) => void,
  handlerModifyIdLink: (customerId: string) => void,
}

const CustomerListTable = ({ page, customerPage, handlerPageChange, handlerModifyIdLink }: Props) => {
  return (
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
          minHeight: '300px',
          width: {
            xs: '274px',
            sm: '100%'
          }
        }}
      >
        <Table
          sx={{
            whiteSpace: 'nowrap',
            mt: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" variant="h6">
                  ID
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" variant="h6">
                  가입일
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" variant="h6">
                  이름
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" variant="h6">
                  연락처
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" variant="h6">
                  주문 보기
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { customerPage && customerPage.elements > 0
              ? customerPage?.contents.map((customer) => (
                <CustomerListItem
                  key={customer.id}
                  customer={customer}
                  onModifyIdClick={() => handlerModifyIdLink(customer.id)}
                />
              ))
              : (
                <TableRow>
                  <TableCell colSpan={5} align={'center'} sx={{height: '300px'}}>
                    <Typography color="textSecondary" sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
                      조회된 사용자이 없습니다.
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        shape="rounded"
        variant="outlined"
        sx={{
          marginTop: '20px;'
        }}
        count={customerPage?.pages}
        page={page}
        onChange={handlerPageChange}
      />
    </Container>
  )
}

export default CustomerListTable
