import React from 'react'
import { StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/props'
import SearchMenuCategory from '@/app/(AuthorizedLayout)/_components/search/SearchMenuCategory'

const StoreSearchMenuCategory = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
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

export default StoreSearchMenuCategory
