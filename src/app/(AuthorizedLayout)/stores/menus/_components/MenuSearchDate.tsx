import React from 'react'
import 'dayjs/locale/ko'
import { MenuSearchProps } from '@/app/(AuthorizedLayout)/stores/menus/_models/props'
import SearchDate from '@/app/(AuthorizedLayout)/_components/search/SearchDate'

const MenuSearchDate = ({ pageParameters, setPageParameters }: MenuSearchProps) => {
  return (
    <SearchDate
      label={"등록/수정일"}
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

export default MenuSearchDate
