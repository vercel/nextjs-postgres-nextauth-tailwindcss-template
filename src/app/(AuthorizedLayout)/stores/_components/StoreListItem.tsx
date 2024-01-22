import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import styles from './storeListItem.module.css'
import { StoreResponse } from '@/app/(AuthorizedLayout)/stores/_models/store'
import { formatDate } from '@/app/(AuthorizedLayout)/_lib/date'

interface Props {
  store: StoreResponse,
}

const StoreListItem = ({ store }: Props) => {
  return (
    <TableRow key={store.id}>
      <TableCell className={styles.tableColumn}>
        <div className={styles.adminAccountIdColumn}>
          <Typography fontSize="h6" fontWeight={600}>
            {store.id}
          </Typography>
        </div>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(store.createDate!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography variant="h6" fontWeight={600}>
          {store.name}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {store.categoryName}
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
        <Typography fontSize="15px" fontWeight={500}>
          {store.imageUrl
            ? (
              <Typography fontSize="15px" fontWeight={500}>
                <u>보기</u>
              </Typography>
            )
            : '-'
          }
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default StoreListItem
