import StoreBusinessModifyContainer
  from '@/app/(AuthorizedLayout)/stores/[storeId]/business/_components/StoreBusinessModifyContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StoreBusinessModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreBusinessModifyContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreBusinessModifyModalPage;
