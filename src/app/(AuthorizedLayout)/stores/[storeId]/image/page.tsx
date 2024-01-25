import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'
import StoreDetailContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreDetailContainer'

const StoreDetailImagePage = ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreDetailContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreDetailImagePage
