import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getStoreDetail } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/getStoreDetail'
import StoreBusinessModifyModal from './StoreBusinessModifyModal'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'

const StoreBusinessModifyContainer = async ({ storeId }: StoreProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', 'detail', storeId],
    queryFn: getStoreDetail
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <StoreBusinessModifyModal storeId={storeId} />
    </HydrationBoundary>
  )
}

export default StoreBusinessModifyContainer
