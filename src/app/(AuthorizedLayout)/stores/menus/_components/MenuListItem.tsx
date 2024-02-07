import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import styles from './menuListItem.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { storeMenuImageUrl } from '@/app/(AuthorizedLayout)/stores/_lib/storeMenuImageUrl'

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
        <Link href={`/stores/menus/${menu.index}`}>
          <Typography variant="h6" fontWeight={600}>
            {menu.name}
          </Typography>
        </Link>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {menu.imagePath
          ? (
            <Image
              src={storeMenuImageUrl(menu.storeId, menu.imagePath)}
              width={0}
              height={0}
              sizes={"100%"}
              alt={menu.name}
              className={styles.image}
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
