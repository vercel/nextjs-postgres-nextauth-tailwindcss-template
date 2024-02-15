import React from 'react'
import SearchDate from '@/app/(AuthorizedLayout)/_components/search/SearchDate'
import { CustomerSearchProps } from '@/app/(AuthorizedLayout)/customers/_models/props'

const CustomerSearchDate = ({ pageParameters, setPageParameters }: CustomerSearchProps) => {
  return (
    <SearchDate
      label={'가입일'}
      startDate={pageParameters.joinedStartDate}
      endDate={pageParameters.joinedEndDate}
      setStartDate={(startDate) => {
        setPageParameters((prev) => ({
          ...prev,
          createdStartDate: startDate
        }))
      }}
      setEndDate={(endDate) => {
        setPageParameters((prev) => ({
          ...prev,
          createdEndDate: endDate
        }))
      }}
    />
  )
}

export default CustomerSearchDate
