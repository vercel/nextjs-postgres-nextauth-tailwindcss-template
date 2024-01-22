import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import styles from './storeListItem.module.css'
import { StoreResponse } from '@/app/(AuthorizedLayout)/stores/_models/store'

interface Props {
  store: StoreResponse,
}

const StoreListItem = ({ store }: Props) => {
  return (
    <TableRow key={store.id}>
      <TableCell>
        <div className={styles.adminAccountIdColumn}>
          <Typography fontSize="h6" fontWeight={600}>
            {store.id}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        <Typography fontSize="15px" fontWeight={500}>
          {format(store.createDate!, 'yyyy-MM-dd')}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" fontWeight={600}>
          {store.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography fontSize="15px" fontWeight={500}>
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default StoreListItem
