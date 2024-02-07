import React from 'react'
import { MenuItem } from '@mui/material'
import SearchField from '@/app/(AuthorizedLayout)/_components/search/SearchField'
import { StoreSearchCondition } from '@/app/(AuthorizedLayout)/stores/_models/props'
import { MenuRequestSearchProps } from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/props'

const MenuRequestSearchField = ({
  pageParameters,
  setPageParameters
}: MenuRequestSearchProps) => {
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
    </SearchField>
  )
}

export default MenuRequestSearchField
