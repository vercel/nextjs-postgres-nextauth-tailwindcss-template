import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'
import StoreMenuModifyModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_components/StoreMenuModifyModal'

const StoreMenuRegisterModalPage = ({ params }: { params: { menuId: number, storeId: string } }) => {
  return(
    <Suspense fallback={<Loading />}>
      <StoreMenuModifyModal menuId={params.menuId} storeId={params.storeId} />
    </Suspense>)
}

export default StoreMenuRegisterModalPage;
