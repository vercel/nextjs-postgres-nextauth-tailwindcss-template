import React, { Suspense } from 'react'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import CustomerListContainer from '@/app/(AuthorizedLayout)/customers/_components/CustomerListContainer'

const StoreListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <CustomerListContainer />
    </Suspense>
  )
}

export default StoreListPage
