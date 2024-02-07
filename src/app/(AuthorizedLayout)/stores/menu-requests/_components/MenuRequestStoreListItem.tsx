import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import styles from './menuRequestStoreListItem.module.css'
import Link from 'next/link'

interface Props {
  menuRequestStore: MenuRequestStoreResponse,
}

const MenuRequestStoreListItem = ({ menuRequestStore }: Props) => {
  return (
    <TableRow key={menuRequestStore.storeId}>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(menuRequestStore.requestDateTime!, 'yyyy. MM. dd HH:mm')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography variant="h6" fontWeight={600}>
          {menuRequestStore.storeId}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menuRequestStore.storeName}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menuRequestStore.menuCategoryName}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menuRequestStore.requestMenuCount}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Link href={`/stores/${menuRequestStore.storeId}/menu-requests`}>
          <Typography fontSize="15px" fontWeight={500}>
            보기
          </Typography>
        </Link>
      </TableCell>
    </TableRow>
  )
}

export default MenuRequestStoreListItem
