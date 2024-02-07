import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'
import StoreMenuDetailContainer
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreMenuDetailContainer'

const StoreMenuModifyPage = ({ params }: { params: { menuIndex: string, storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <StoreMenuDetailContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default StoreMenuModifyPage
