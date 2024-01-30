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
import MenuListItem from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuListItem'

type Props = {
  page: number,
  menuPage: Page<MenuResponse> | undefined,
  handlerPageChange: (
    event: ChangeEvent<unknown>,
    page: number
  ) => void,
}

const MenuListTable = ({ page, menuPage, handlerPageChange }: Props) => {
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
                  등록일
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  메뉴명
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  이미지
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center'}}>
                <Typography color="textSecondary" variant="h6">
                  가격
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
            </TableRow>
          </TableHead>
          <TableBody>
            { menuPage && menuPage.elements > 0
              ? menuPage?.contents.map((store, idx) => (
                <MenuListItem
                  key={idx}
                  menu={store}
                />
              ))
              : (
                <TableRow>
                  <TableCell colSpan={6} align={'center'} sx={{height: '300px'}}>
                    <Typography color="textSecondary" sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
                      조회된 메뉴가 없습니다.
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
        count={menuPage?.pages}
        page={page}
        onChange={handlerPageChange}
      />
    </Container>
  )
}

export default MenuListTable
