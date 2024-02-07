import React from 'react'
import { StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/props'
import SearchDate from '@/app/(AuthorizedLayout)/_components/search/SearchDate'

const StoreSearchDate = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
  return (
    <SearchDate
      label={'등록일'}
      startDate={pageParameters.createdStartDate}
      endDate={pageParameters.createdEndDate}
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

export default StoreSearchDate
