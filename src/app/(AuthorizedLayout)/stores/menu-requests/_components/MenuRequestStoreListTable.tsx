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
import MenuRequestStoreListItem
  from '@/app/(AuthorizedLayout)/stores/menu-requests/_components/MenuRequestStoreListItem'

type Props = {
  page: number,
  menuRequestStorePage: Page<MenuRequestStoreListResponse> | undefined,
  handlerPageChange: (
    event: ChangeEvent<unknown>,
    page: number
  ) => void,
}

const MenuRequestStoreListTable = ({
  page,
  menuRequestStorePage,
  handlerPageChange
}: Props) => {
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
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  요청일
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  매장 ID
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  매장명
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  메뉴구분
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  메뉴 갯수
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  -
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { menuRequestStorePage && menuRequestStorePage.elements > 0
              ? menuRequestStorePage?.contents.map((menuRequestStore, idx) => (
                <MenuRequestStoreListItem
                  key={idx}
                  menuRequestStore={menuRequestStore}
                />
              ))
              : (
                <TableRow>
                  <TableCell colSpan={6} align={'center'} sx={{height: '300px'}}>
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
        count={menuRequestStorePage?.pages}
        page={page}
        onChange={handlerPageChange}
      />
    </Container>
  )
}

export default MenuRequestStoreListTable
