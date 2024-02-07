'use client'

import React from 'react'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { MenuProps } from '@/app/(AuthorizedLayout)/stores/menus/[menuIndex]/_models/props'
import useMenu from '@/app/(AuthorizedLayout)/stores/menus/[menuIndex]/_hooks/useMenu'
import StoreMenuModify from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_components/StoreMenuModify'
import { StoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_models/storeMenu'

const MenuModifyModal = ({ menuIndex }: MenuProps) => {
  const { menu, session, isLoading } = useMenu(menuIndex)
  if (isLoading || session == null || menu === undefined) {
    return <Loading />
  }

  return (
    <StoreMenuModify
      storeMenu={{
        index: menu.index,
        storeId: menu.storeId,
        name: menu.name,
        englishName: menu.englishName,
        price: menu.price,
        imagePath: menu.imagePath,
        allergies: menu.allergies,
        description: menu.description,
        createdDate: menu.createdDate,
      } as StoreMenu}
      session={session}
    />
  )
}

export default MenuModifyModal
