import React from 'react'
import { Box, Chip, TableCell, TableRow, Typography } from '@mui/material'
import { AdminAccount } from 'thunder-order/accounts'
import { format } from 'date-fns/format'
import { formatPhoneNumber } from '@/utils/phoneNumber'

interface AccountListItemPropType {
  account: AdminAccount
}

const AccountListItem = ({ account }: AccountListItemPropType) => {
  return (
    <TableRow key={account.id}>
      <TableCell>
        <Typography fontSize="h6" fontWeight={600}>
          {account.id}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography fontSize="15px" fontWeight={500}>
          {format(account.lastUpdatedAt, 'yyyy-MM-dd')}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h6" fontWeight={600}>
          {account.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography fontSize="15px" fontWeight={500}>
          {formatPhoneNumber(account.phoneNumber)}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default AccountListItem
