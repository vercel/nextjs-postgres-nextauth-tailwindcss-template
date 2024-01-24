import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAdminAccounts } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/getAdminAccounts'
import AdminAccountListView from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountListView'
import { Box, Container } from '@mui/material'

const AdminAccountListContainer = async () => {
  const initPageParameter = {
    page: 1
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['admin-accounts', initPageParameter],
    queryFn: getAdminAccounts,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Container>
      <Box mt={3}>
        <HydrationBoundary state={dehydratedState}>
          <AdminAccountListView pageParameters={initPageParameter} />
        </HydrationBoundary>
      </Box>
    </Container>
  )
}

export default AdminAccountListContainer
