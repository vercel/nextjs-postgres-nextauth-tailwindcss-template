import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'
import StoreMenuRegisterModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_components/StoreMenuRegisterModal'

const StoreMenuRegisterModalPage = ({ params }: { params: { storeId: string } }) => {
  return(
    <Suspense fallback={<Loading />}>
      <StoreMenuRegisterModal storeId={params.storeId} />
    </Suspense>)
}

export default StoreMenuRegisterModalPage;
