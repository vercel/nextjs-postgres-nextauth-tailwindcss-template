import StoreDetailContainer from './_components/StoreDetailContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'

const StoreDetailPage = ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreDetailContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreDetailPage
