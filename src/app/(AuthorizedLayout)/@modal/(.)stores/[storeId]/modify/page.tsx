import StoreModifyContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_components/StoreModifyContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StoreModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreModifyContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreModifyModalPage;
