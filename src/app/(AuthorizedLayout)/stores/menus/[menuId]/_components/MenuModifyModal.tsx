'use client'

import React from 'react'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { MenuProps } from '@/app/(AuthorizedLayout)/stores/menus/[menuId]/_models/props'
import useMenu from '@/app/(AuthorizedLayout)/stores/menus/[menuId]/_hooks/useMenu'
import StoreMenuModify from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_components/StoreMenuModify'

const MenuModifyModal = ({ menuId }: MenuProps) => {
  const { menu, session, isLoading } = useMenu(menuId)
  if (isLoading || session == null || menu === undefined) {
    return <Loading />
  }

  return (
    <StoreMenuModify
      storeMenu={{
        id: menu.id,
        storeId: menu.storeId,
        name: menu.name,
        englishName: menu.englishName,
        price: menu.price,
        imagePath: menu.imageUrl,
        allergies: menu.allergies,
        description: menu.description,
        createdDate: menu.createdDate,
      }}
      session={session}
    />
  )
}

export default MenuModifyModal
