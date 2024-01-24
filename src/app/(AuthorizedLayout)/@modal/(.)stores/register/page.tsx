import StoreRegisterModal from '@/app/(AuthorizedLayout)/stores/register/_components/StoreRegisterModal'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StoreRegisterModalPage = () => {
  return(
    <Suspense fallback={<Loading />}>
      <StoreRegisterModal />
    </Suspense>)
}

export default StoreRegisterModalPage;
