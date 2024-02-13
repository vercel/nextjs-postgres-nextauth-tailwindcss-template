import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getStoreDetail } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/getStoreDetail'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import MenuRequestStoreViewModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_components/MenuRequestStoreViewModal'

const MenuRequestStoreViewContainer = async ({ storeId }: StoreProps) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['stores', storeId, 'menu-requests'],
    queryFn: getStoreDetail
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <MenuRequestStoreViewModal storeId={storeId} />
    </HydrationBoundary>
  )
}

export default MenuRequestStoreViewContainer
