import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Box, Container } from '@mui/material'
import StoreDetailView from './StoreDetailView'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeList.module.css'
import { getStoreDetail } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/getStoreDetail'

type Props = {
  storeId: string
}

const StoreDetailContainer = async ({ storeId }: Props) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', 'detail', storeId],
    queryFn: getStoreDetail,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Container className={styles.container}>
      <Box mt={3}>
        <HydrationBoundary state={dehydratedState}>
          <StoreDetailView storeId={storeId} />
        </HydrationBoundary>
      </Box>
    </Container>
  )
}

export default StoreDetailContainer
