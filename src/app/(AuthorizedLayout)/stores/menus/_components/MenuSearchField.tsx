import React from 'react'
import { MenuItem } from '@mui/material'
import { MenuSearchProps } from '@/app/(AuthorizedLayout)/stores/menus/_models/props'
import SearchField from '@/app/(AuthorizedLayout)/_components/search/SearchField'
import { StoreSearchCondition } from '@/app/(AuthorizedLayout)/stores/_models/store'

const MenuSearchField = ({ pageParameters, setPageParameters }: MenuSearchProps) => {
  return (
    <SearchField
      searchCondition={pageParameters.searchCondition}
      searchValue={pageParameters.searchValue}
      setSearchCondition={(searchCondition) => {
        setPageParameters((prev) => ({
          ...prev,
          searchCondition: searchCondition as StoreSearchCondition
        }))
      }}
      setSearchValue={(searchValue) => {
        setPageParameters((prev) => ({
          ...prev,
          searchValue: searchValue
        }))
      }}
    >
      <MenuItem value={'STORE_NAME'}>매장명</MenuItem>
      <MenuItem value={'STORE_ID'}>매장 ID</MenuItem>
      <MenuItem value={'MENU_NAME'}>메뉴명</MenuItem>
    </SearchField>
  )
}

export default MenuSearchField
