'use client'

import React from 'react'
import useStoreMenu from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_hooks/useStoreMenu'
import { StoreMenuProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/props'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import StoreMenuModify from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_components/StoreMenuModify'

const StoreMenuModifyModal = ({ menuId, storeId }: StoreMenuProps) => {
  const { storeMenu, session, isLoading } = useStoreMenu(menuId, storeId)
  if (isLoading || session == null || storeMenu === undefined) {
    return <Loading />
  }

  return (
    <StoreMenuModify
      storeMenu={{
        id: storeMenu.id,
        storeId: storeId,
        name: storeMenu.name,
        englishName: storeMenu.englishName,
        price: storeMenu.price,
        imageUrl: storeMenu.imageUrl,
        allergies: storeMenu.allergies,
        description: storeMenu.description,
        createdDate: storeMenu.createdDate,
      }}
      session={session}
    />
  )
}

export default StoreMenuModifyModal
