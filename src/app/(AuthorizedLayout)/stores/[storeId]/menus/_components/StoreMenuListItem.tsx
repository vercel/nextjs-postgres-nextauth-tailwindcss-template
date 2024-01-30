import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { Button, TableCell, Typography } from '@mui/material'
import styles from './storeMenuListItem.module.css'
import Link from 'next/link'
import { storeMenuImageUrl } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_lib/storeMenuImageUrl'
import Image from 'next/image'

interface Props {
  storeId: string,
  menu: StoreMenuDetailResponse,
}

const StoreMenuListItem = ({ storeId, menu }: Props) => {
  return (
    <TableRow key={menu.id}>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(menu.createdDate!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {menu.imageUrl
          ? (
            <Image
              src={storeMenuImageUrl(storeId, menu.imageUrl)}
              width={0}
              height={0}
              sizes={"100%"}
              alt={storeId}
              className={styles.image}
            />
          )
          : (<Typography fontSize="15px" fontWeight={500}>-</Typography>)
        }
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Link href={`/menu/${menu.id}/modify`}>
          <Typography variant="h6" fontWeight={600}>
            {menu.name}
          </Typography>
        </Link>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {menu.price.toLocaleString('ko')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Button>수정</Button>
      </TableCell>
    </TableRow>
  )
}

export default StoreMenuListItem
