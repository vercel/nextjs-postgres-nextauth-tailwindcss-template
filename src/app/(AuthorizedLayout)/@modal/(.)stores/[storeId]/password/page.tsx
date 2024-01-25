import StorePasswordModifyModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/password/_components/StorePasswordModifyModal'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StorePasswordModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <StorePasswordModifyModal storeId={params.storeId} />
    </Suspense>
  )
}

export default StorePasswordModifyModalPage;
