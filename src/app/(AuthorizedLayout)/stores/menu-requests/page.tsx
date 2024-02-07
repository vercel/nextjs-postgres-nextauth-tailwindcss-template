import React, { Suspense } from 'react'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import MenuRequestStoreListContainer
  from '@/app/(AuthorizedLayout)/stores/menu-requests/_components/MenuRequestStoreListContainer'

const MenuRequestStoreListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <MenuRequestStoreListContainer />
    </Suspense>
  )
}

export default MenuRequestStoreListPage
