import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Box, Container } from '@mui/material'
import StoreListView from './StoreListView'
import { getStores } from '@/app/(AuthorizedLayout)/stores/_lib/getStores'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeList.module.css'
import { StorePageParameters } from '@/app/(AuthorizedLayout)/stores/_models/store'

const StoreListContainer = async () => {
  const initPageParameter = {
    searchCondition: 'STORE_NAME',
    searchValue: '',
    createdStartDate: '',
    createdEndDate: '',
    menuCategories: [
      'MEALS',
      'SNACKS',
      'DESSERTS',
      'CAFES'
    ],
    statuses: [
      'NOT_DOCUMENTS_SUBMITTED',
      'NOT_BUSINESS_REGISTERED',
      'NOT_MENU_REGISTERED',
      'EXPIRED_HEALTH_CERTIFICATE'
    ],
    page: 1
  } as StorePageParameters

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', initPageParameter],
    queryFn: getStores,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Container className={styles.container}>
      <Box mt={3}>
        <HydrationBoundary state={dehydratedState}>
          <StoreListView pageParameters={initPageParameter} />
        </HydrationBoundary>
      </Box>
    </Container>
  )
}

export default StoreListContainer
