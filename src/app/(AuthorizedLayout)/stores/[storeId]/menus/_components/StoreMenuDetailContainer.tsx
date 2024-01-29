import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Box, Container } from '@mui/material'
import styles from './storeMenuDetailContainer.module.css'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import { getStoreMenuDetails } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_lib/getStoreMenuDetails'
import StoreMenuDetailView from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreMenuDetailView'

const StoreMenuDetailContainer = async ({ storeId }: StoreProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', 'menus', storeId],
    queryFn: getStoreMenuDetails
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Container className={styles.container}>
      <Box mt={3}>
        <HydrationBoundary state={dehydratedState}>
          <StoreMenuDetailView storeId={storeId} />
        </HydrationBoundary>
      </Box>
    </Container>
  )
}

export default StoreMenuDetailContainer
