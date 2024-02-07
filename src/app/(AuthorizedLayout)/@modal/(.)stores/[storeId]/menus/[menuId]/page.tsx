import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'
import StoreMenuModifyModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_components/StoreMenuModifyModal'

const StoreMenuRegisterModalPage = ({ params }: { params: { menuIndex: number, storeId: string } }) => {
  return(
    <Suspense fallback={<Loading />}>
      <StoreMenuModifyModal menuIndex={params.menuIndex} storeId={params.storeId} />
    </Suspense>)
}

export default StoreMenuRegisterModalPage;
