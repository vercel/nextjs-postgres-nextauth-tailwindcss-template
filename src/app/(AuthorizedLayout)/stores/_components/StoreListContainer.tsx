import { QueryClient } from '@tanstack/react-query'
import StoreListView from './StoreListView'
import { getStores } from '@/app/(AuthorizedLayout)/stores/_lib/getStores'
import { StorePageParameters } from '@/app/(AuthorizedLayout)/stores/_models/store'
import ListContainer from '../../_components/container/ListContainer'

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
    queryFn: getStores
  })

  return (
    <ListContainer queryClient={queryClient}>
      <StoreListView pageParameters={initPageParameter} />
    </ListContainer>
  )
}

export default StoreListContainer
