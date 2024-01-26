import React from 'react'
import { MenuSearchProps } from '@/app/(AuthorizedLayout)/stores/menus/_models/props'
import SearchMenuCategory from '@/app/(AuthorizedLayout)/_components/search/SearchMenuCategory'

const MenuSearchMenuCategory = ({ pageParameters, setPageParameters }: MenuSearchProps) => {
  return (
    <SearchMenuCategory
      menuCategories={pageParameters.menuCategories}
      setMenuCategories={(menuCategories) => {
        setPageParameters((prev) => ({
          ...prev,
          menuCategories: menuCategories
        }))
      }}
    />
  )
}

export default MenuSearchMenuCategory
