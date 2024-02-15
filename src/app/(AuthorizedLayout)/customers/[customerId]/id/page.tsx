import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'
import CustomerListContainer from '@/app/(AuthorizedLayout)/customers/_components/CustomerListContainer'

const CustomerIdModifyPage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <CustomerListContainer />
    </Suspense>
  )
}

export default CustomerIdModifyPage;
