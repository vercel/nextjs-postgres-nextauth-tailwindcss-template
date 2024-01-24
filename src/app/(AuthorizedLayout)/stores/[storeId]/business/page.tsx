import StoreDetailContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreDetailContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StoreBusinessModifyPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreDetailContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreBusinessModifyPage;
