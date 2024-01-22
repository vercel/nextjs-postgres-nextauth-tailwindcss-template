import { StorePageProperties } from '@/app/(AuthorizedLayout)/stores/_models/store'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Box, Container } from '@mui/material'
import StoreListView from './StoreListView'
import { getStores } from '@/app/(AuthorizedLayout)/stores/_lib/getStores'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeListView.module.css'

const StoreListContainer = async ({ pageParameters }: StorePageProperties) => {
  let initPageParameter = { ...pageParameters }
  if (initPageParameter.page === undefined) {
    initPageParameter = {
      ...initPageParameter,
      searchCondition: 'STORE_NAME',
      searchValue: '',
      createdStartDate: '',
      createdEndDate: '',
      menuCategories: [
        'MEALS',
        'SNACKS',
        'DESSERTS',
        'CAFES',
      ],
      statuses: [
        'NOT_DOCUMENTS_SUBMITTED',
        'NOT_BUSINESS_REGISTERED',
        'NOT_MENU_REGISTERED',
        'EXPIRED_HEALTH_CERTIFICATE',
      ],
      page: 1
    }
  }

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
