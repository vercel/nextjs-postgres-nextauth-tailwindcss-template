'use client'

import { Box, Paper } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
// components
import { styled } from '@mui/material/styles'
import AccountList from './components/AccountList'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

const Accounts = () => {
  return (
    <PageContainer title="Accounts" description="Account List">
      <Box mt={3}>
        <AccountList />
      </Box>
    </PageContainer>
  )
}

export default Accounts
