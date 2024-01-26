import StoreListContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreListContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'

const StoreImagePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreListContainer />
    </Suspense>
  )
}

export default StoreImagePage
