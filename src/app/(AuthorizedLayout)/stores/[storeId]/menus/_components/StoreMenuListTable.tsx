import React from 'react'
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import StoreMenuListItem from './StoreMenuListItem'

type Props = {
  menus: StoreMenuDetailResponse[]
}

const StoreMenuListTable = ({ menus }: Props) => {
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
                  등록일
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  이미지
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  메뉴명
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  가격
                </Typography>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { menus && menus.length > 0
              ? menus.map((menu) => (
                <StoreMenuListItem
                  key={menu.id}
                  menu={menu}
                />
              ))
              : (
                <TableRow>
                  <TableCell colSpan={5} align={'center'} sx={{height: '300px'}}>
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
    </Container>
  )
}

export default StoreMenuListTable
