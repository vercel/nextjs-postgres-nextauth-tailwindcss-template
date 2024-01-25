import StoreListContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreListContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'
import StoreImageContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreImageContainer'

const StoreImagePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreListContainer />
    </Suspense>
  )
}

export default StoreImagePage
