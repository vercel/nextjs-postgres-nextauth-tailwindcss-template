import React from 'react'
import { MenuItem } from '@mui/material'
import { StoreSearchCondition, StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/props'
import SearchField from '@/app/(AuthorizedLayout)/_components/search/SearchField'

const StoreSearchField = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
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

export default StoreSearchField
