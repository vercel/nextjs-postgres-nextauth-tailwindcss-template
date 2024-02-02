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
import StoreListItem from '@/app/(AuthorizedLayout)/stores/_components/StoreListItem'
import { Page } from '@/app/(AuthorizedLayout)/_models/common'
import { StoreResponse } from '@/app/(AuthorizedLayout)/stores/_models/response'

type Props = {
  page: number,
  storePage: Page<StoreResponse> | undefined,
  handlerPageChange: (
    event: ChangeEvent<unknown>,
    page: number
  ) => void,
}

const StoreListTable = ({ page, storePage, handlerPageChange }: Props) => {
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
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  등록일
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  매장명
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  메뉴구분
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  사업자 등록
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  메뉴 수
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  필수 서류
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  보건증 발급일
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  보건증 만기일
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  이미지
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { storePage && storePage.elements > 0
              ? storePage?.contents.map((store, idx) => (
                <StoreListItem
                  key={idx}
                  store={store}
                />
              ))
              : (
                <TableRow>
                  <TableCell colSpan={10} align={'center'} sx={{height: '300px'}}>
                    <Typography color="textSecondary" sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
                      조회된 매장이 없습니다.
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
        count={storePage?.pages}
        page={page}
        onChange={handlerPageChange}
      />
    </Container>
  )
}

export default StoreListTable
