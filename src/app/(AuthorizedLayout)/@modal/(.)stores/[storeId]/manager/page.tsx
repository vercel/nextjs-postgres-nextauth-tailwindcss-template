import StoreManagerModifyContainer from "@/app/(AuthorizedLayout)/stores/[storeId]/manager/_components/StoreManagerModifyContainer";
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'

const StoreManagerModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreManagerModifyContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreManagerModifyModalPage;
