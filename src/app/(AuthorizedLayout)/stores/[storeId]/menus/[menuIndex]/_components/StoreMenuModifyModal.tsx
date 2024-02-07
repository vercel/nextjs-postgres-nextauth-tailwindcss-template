'use client'

import React from 'react'
import useStoreMenu from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_hooks/useStoreMenu'
import { StoreMenuProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_models/props'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import StoreMenuModify from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_components/StoreMenuModify'

const StoreMenuModifyModal = ({ menuIndex, storeId }: StoreMenuProps) => {
  const { storeMenu, session, isLoading } = useStoreMenu(menuIndex, storeId)
  if (isLoading || session == null || storeMenu === undefined) {
    return <Loading />
  }

  return (
    <StoreMenuModify
      storeMenu={{
        index: storeMenu.index,
        storeId: storeId,
        name: storeMenu.name,
        englishName: storeMenu.englishName,
        price: storeMenu.price,
        imagePath: storeMenu.imageUrl,
        allergies: storeMenu.allergies,
        description: storeMenu.description,
        createdDate: storeMenu.createdDate,
      }}
      session={session}
    />
  )
}

export default StoreMenuModifyModal
