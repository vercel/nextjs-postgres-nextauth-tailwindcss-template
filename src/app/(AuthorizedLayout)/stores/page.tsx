import React, { Suspense } from 'react'
import StoreListContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreListContainer'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'

const StoreListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreListContainer />
    </Suspense>
  )
}

export default StoreListPage
