import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import styles from './storeListItem.module.css'
import Link from 'next/link'
import StoreImageModal from '@/app/(AuthorizedLayout)/stores/_components/StoreImageModal'

interface Props {
  menu: MenuResponse,
}

const MenuListItem = ({ menu }: Props) => {
  return (
    <TableRow key={menu.storeId}>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(menu.createdDate!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Link href={`/menu/${menu.id}/modify`}>
          <Typography variant="h6" fontWeight={600}>
            {menu.name}
          </Typography>
        </Link>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {menu.imageUrl
          ? (
            <StoreImageModal
              label={
                <Typography fontSize="15px" fontWeight={500}><u>보기</u></Typography>
              }
              storeId={menu.storeId}
              imageName={menu.imageUrl}
            />
          )
          : (<Typography fontSize="15px" fontWeight={500}>-</Typography>)
        }
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menu.price.toLocaleString('ko')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menu.storeName}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menu.categoryName}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default MenuListItem
