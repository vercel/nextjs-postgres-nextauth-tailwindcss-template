import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'
import MenuRequestStoreViewContainer
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_components/MenuRequestStoreViewContainer'

const MenuRequestStorePage = ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <MenuRequestStoreViewContainer storeId={params.storeId} />
    </Suspense>
  )
}

export default MenuRequestStorePage
