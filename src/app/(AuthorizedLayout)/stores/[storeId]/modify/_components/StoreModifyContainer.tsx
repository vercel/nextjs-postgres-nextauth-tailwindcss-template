import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getStoreDetail } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/getStoreDetail'
import StoreModifyModal from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_components/StoreModifyModal'

type Props = {
  storeId: string
}

const StoreModifyContainer = async ({ storeId }: Props) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', 'detail', storeId],
    queryFn: getStoreDetail
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <StoreModifyModal storeId={storeId} />
    </HydrationBoundary>
  )
}

export default StoreModifyContainer
