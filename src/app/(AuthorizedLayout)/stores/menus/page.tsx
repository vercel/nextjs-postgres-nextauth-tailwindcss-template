import React, { Suspense } from 'react'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import MenuListContainer from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuListContainer'

const MenuListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <MenuListContainer />
    </Suspense>
  )
}

export default MenuListPage
