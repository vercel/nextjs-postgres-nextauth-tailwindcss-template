import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import styles from './storeListItem.module.css'
import { formatDate } from '@/app/(AuthorizedLayout)/_lib/date'
import Link from 'next/link'
import StoreImageModal from '@/app/(AuthorizedLayout)/stores/_components/StoreImageModal'
import { StoreResponse } from '@/app/(AuthorizedLayout)/stores/_models/response'

interface Props {
  store: StoreResponse,
}

const StoreListItem = ({ store }: Props) => {
  return (
    <TableRow key={store.id}>
      <TableCell className={styles.tableColumn}>
        <Link href={`/stores/${store.id}`}>
          <Typography fontSize="h6" fontWeight={600}>
            {store.id}
          </Typography>
        </Link>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(store.createdDate!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Link href={`/stores/${store.id}`}>
          <Typography variant="h6" fontWeight={600}>
            {store.name}
          </Typography>
        </Link>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {store.menuCategoryName}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {store.isBusinessRegistered ? 'O' : null}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {store.menuCount}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {store.submittedDocumentCount}/3
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {formatDate(store.healthCertRegisterDate)}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {formatDate(store.healthCertExpirationDate)}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        {store.imagePath
          ? (
            <StoreImageModal
              label={
                <Typography fontSize="15px" fontWeight={500}><u>보기</u></Typography>
              }
              storeId={store.id}
              imagePath={store.imagePath}
            />
          )
          : (<Typography fontSize="15px" fontWeight={500}>-</Typography>)
        }
      </TableCell>
    </TableRow>
  )
}

export default StoreListItem
