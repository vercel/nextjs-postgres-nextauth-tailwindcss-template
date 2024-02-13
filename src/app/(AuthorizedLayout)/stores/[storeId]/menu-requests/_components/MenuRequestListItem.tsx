import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { Checkbox, TableCell, Typography } from '@mui/material'
import styles from './menuRequestListItem.module.css'
import { storeMenuImageUrl } from '@/app/(AuthorizedLayout)/stores/_lib/storeMenuImageUrl'
import Image from 'next/image'
import { MenuRequestResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_models/response'
import MenuRequestItemModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_components/MenuRequestItemModal'
import MenuDescription from '../../../_components/MenuDescription'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface Props {
  storeId: string,
  menuRequest: MenuRequestResponse,
  selectedIndexes: number[],
  setSelectedIndexes: Dispatch<SetStateAction<number[]>>,
}

/**
 * 메뉴 승인요청이 선택되었느지 여부.
 *
 * @param menuRequest
 * @param selectedIndexes
 */
const isSelected = (
  menuRequest: MenuRequestResponse,
  selectedIndexes: number[],
) => {
  if (selectedIndexes.length == 0) {
    return false
  }

  return selectedIndexes.includes(menuRequest.index)
}

const MenuRequestListItem = ({ storeId, menuRequest, selectedIndexes, setSelectedIndexes }: Props) => {
  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIndexes([...selectedIndexes, menuRequest.index])
      return
    }

    const filtered = selectedIndexes.filter((selectedIndex) => selectedIndex != menuRequest.index)
    setSelectedIndexes(filtered)
  }

  return (
    <TableRow key={menuRequest.index}>
      <TableCell sx={{ textAlign: 'center' }}>
        <Checkbox
          checked={isSelected(menuRequest, selectedIndexes)}
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(menuRequest.createdDate!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {menuRequest.imagePath
          ? (
            <MenuRequestItemModal
              content={
                <Image
                  src={storeMenuImageUrl(storeId, menuRequest.imagePath)}
                  width={0}
                  height={0}
                  sizes={"100%"}
                  alt={menuRequest.name}
                  className={styles.image}
                />
              }
              modalContent={
                <Image
                  src={storeMenuImageUrl(storeId, menuRequest.imagePath)}
                  width={0}
                  height={0}
                  sizes={"100%"}
                  alt={menuRequest.name}
                  className={styles.overlayImage}
                />
              }
            />
          )
          : (<Typography fontSize="15px" fontWeight={500}>-</Typography>)
        }
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography variant="h6" fontWeight={600}>
          {menuRequest.name}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography variant="h6" fontWeight={600}>
          {menuRequest.englishName}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {menuRequest.allergies != ''
          ? (
            <MenuRequestItemModal
              content={
                <Typography fontSize="15px" fontWeight={500}><u>자세히보기</u></Typography>
              }
              modalContent={menuRequest.allergies}
            />
          )
          : (<Typography fontSize="15px" fontWeight={500}>-</Typography>)
        }
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {menuRequest.description != ''
          ? (
            <MenuRequestItemModal
              content={
                <Typography fontSize="15px" fontWeight={500}><u>자세히보기</u></Typography>
              }
              modalContent={
                <MenuDescription content={menuRequest.description} />
              }
            />
          )
          : (<Typography fontSize="15px" fontWeight={500}>-</Typography>)
        }
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menuRequest.price.toLocaleString('ko')}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default MenuRequestListItem
