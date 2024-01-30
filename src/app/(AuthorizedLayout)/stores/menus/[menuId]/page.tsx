import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import React, { Suspense } from 'react'
import MenuListContainer from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuListContainer'

const StoreMenuModifyPage = ({ params }: { params: { menuId: string, storeId: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <MenuListContainer />
    </Suspense>
  )
}

export default StoreMenuModifyPage
