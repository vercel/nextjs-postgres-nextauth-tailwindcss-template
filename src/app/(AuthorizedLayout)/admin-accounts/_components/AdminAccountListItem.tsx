import TableRow from '@mui/material/TableRow'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { format } from 'date-fns/format'
import { TableCell, Typography } from '@mui/material'
import { AdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_models/AdminAccount'
import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'
import styles from './adminAccountListItem.module.css'

interface Props {
  adminAccount: AdminAccount,
  onModifyClick: () => void
}

const AdminAccountListItem = ({ adminAccount, onModifyClick }: Props) => {
  return (
    <TableRow key={adminAccount.id}>
      <TableCell>
        <div className={styles.adminAccountIdColumn}>
          <Typography fontSize="h6" fontWeight={600}>
            {adminAccount.id}
          </Typography>
          <EditNoteIcon className={styles.editButton} onClick={onModifyClick} />
        </div>
      </TableCell>
      <TableCell>
        <Typography fontSize="15px" fontWeight={500}>
          {format(adminAccount.lastUpdatedAt!, 'yyyy. MM. dd')}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" fontWeight={600}>
          {adminAccount.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography fontSize="15px" fontWeight={500}>
          {formatPhoneNumber(adminAccount.phoneNumber)}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default AdminAccountListItem
