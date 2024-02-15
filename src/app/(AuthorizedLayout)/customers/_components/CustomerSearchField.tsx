import React from 'react'
import { MenuItem } from '@mui/material'
import SearchField from '@/app/(AuthorizedLayout)/_components/search/SearchField'
import { CustomerSearchCondition, CustomerSearchProps } from '@/app/(AuthorizedLayout)/customers/_models/props'

const CustomerSearchField = ({ pageParameters, setPageParameters }: CustomerSearchProps) => {
  return (
    <SearchField
      searchCondition={pageParameters.searchCondition}
      searchValue={pageParameters.searchValue}
      setSearchCondition={(searchCondition) => {
        setPageParameters((prev) => ({
          ...prev,
          searchCondition: searchCondition as CustomerSearchCondition
        }))
      }}
      setSearchValue={(searchValue) => {
        setPageParameters((prev) => ({
          ...prev,
          searchValue: searchValue
        }))
      }}
    >
      <MenuItem value={'CUSTOMER_ID'}>사용자 ID</MenuItem>
      <MenuItem value={'NAME'}>이름</MenuItem>
      <MenuItem value={'PHONE_NUMBER'}>연락처</MenuItem>
    </SearchField>
  )
}

export default CustomerSearchField
