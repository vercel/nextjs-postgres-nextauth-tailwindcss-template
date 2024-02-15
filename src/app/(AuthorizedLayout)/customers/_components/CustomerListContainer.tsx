import { QueryClient } from '@tanstack/react-query'
import CustomerListView from './CustomerListView'
import ListContainer from '../../_components/container/ListContainer'
import { CustomerPageParameters } from '@/app/(AuthorizedLayout)/customers/_models/props'
import { getCustomers } from '@/app/(AuthorizedLayout)/customers/_lib/getCustomers'

const CustomerListContainer = async () => {
  const initPageParameter = {
    searchCondition: 'CUSTOMER_ID',
    searchValue: '',
    joinedStartDate: '',
    joinedEndDate: '',
    page: 1
  } as CustomerPageParameters

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['customers', initPageParameter],
    queryFn: getCustomers
  })

  return (
    <ListContainer queryClient={queryClient}>
      <CustomerListView pageParameters={initPageParameter} />
    </ListContainer>
  )
}

export default CustomerListContainer
