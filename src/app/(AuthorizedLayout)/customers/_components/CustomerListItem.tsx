import TableRow from '@mui/material/TableRow'
import { format } from 'date-fns/format'
import { Box, IconButton, TableCell, Typography } from '@mui/material'
import styles from './customerListItem.module.css'
import Link from 'next/link'
import { CustomerResponse } from '@/app/(AuthorizedLayout)/customers/_models/response'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'

interface Props {
  customer: CustomerResponse,
  onModifyIdClick: () => void
}

const CustomerListItem = ({ customer, onModifyIdClick }: Props) => {
  return (
    <TableRow key={customer.id}>
      <TableCell className={styles.tableColumn}>
        <Box className={styles.idColumn}>
          <Typography fontSize="h6" fontWeight={600}>
            {customer.id}
          </Typography>
          <IconButton className={styles.editButton} onClick={onModifyIdClick}>
            <EditNoteIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {format(customer.joinedDate!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography variant="h6" fontWeight={600}>
          {customer.name}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Typography fontSize="15px" fontWeight={500}>
          {formatPhoneNumber(customer.phoneNumber)}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableColumn}>
        <Link href={`/customers/${customer.id}/orders`}>
          <Typography fontSize="15px" fontWeight={500}><u>보기</u></Typography>
        </Link>
      </TableCell>
    </TableRow>
  )
}

export default CustomerListItem
