import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import {
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import MenuRequestListItem from './MenuRequestListItem'
import { MenuRequestResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_models/response'

type Props = {
  storeId: string,
  menuRequests: MenuRequestResponse[],
  selectedIndexes: number[],
  setSelectedIndexes: Dispatch<SetStateAction<number[]>>
}

/**
 * 모든 메뉴 승인요청이 선택되었느지 여부.
 *
 * @param menuRequests
 * @param selectedIndexes
 */
const isAllSelected = (
  menuRequests: MenuRequestResponse[],
  selectedIndexes: number[],
) => {
  if (selectedIndexes.length == 0 || menuRequests.length == 0) {
    return false
  }

  if (selectedIndexes.length != menuRequests.length) {
    return false
  }

  return menuRequests.every((menuRequest) => {
    return selectedIndexes.includes(menuRequest.index)
  })
}

const MenuRequestListTable = ({ storeId, menuRequests, selectedIndexes, setSelectedIndexes }: Props) => {
  const isChecked = isAllSelected(menuRequests, selectedIndexes)
  const handleAllSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIndexes(menuRequests.map((menuRequest) => menuRequest.index))
      return
    }

    setSelectedIndexes([])
  }

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
              <TableCell sx={{ textAlign: 'center' }}>
                <Checkbox
                  checked={isChecked}
                  onChange={handleAllSelect}
                />
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  등록일
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  이미지
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  메뉴명
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  영문 메뉴명
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  원산지 및 알러지 정보
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  상품설명
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography color="textSecondary" variant="h6">
                  가격
                </Typography>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { menuRequests && menuRequests.length > 0
              ? menuRequests.map((menuRequest) => (
                <MenuRequestListItem
                  key={menuRequest.index}
                  storeId={storeId}
                  menuRequest={menuRequest}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                />
              ))
              : (
                <TableRow>
                  <TableCell colSpan={8} align={'center'} sx={{height: '300px'}}>
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

export default MenuRequestListTable
