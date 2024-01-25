import StoreDocumentsModifyContainer
  from '@/app/(AuthorizedLayout)/stores/[storeId]/documents/_components/StoreDocumentsModifyContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StoreDocumentModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreDocumentsModifyContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreDocumentModifyModalPage
