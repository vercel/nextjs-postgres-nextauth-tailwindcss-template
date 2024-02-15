import React from 'react'
import { BasicButton } from '@/app/_components/BasicButton'
import SearchContainer from '@/app/(AuthorizedLayout)/_components/container/SearchContainer'
import { CustomerPageParameters, CustomerSearchProps } from '@/app/(AuthorizedLayout)/customers/_models/props'
import { Box } from '@mui/material'
import CustomerSearchField from '@/app/(AuthorizedLayout)/customers/_components/CustomerSearchField'
import CustomerSearchDate from '@/app/(AuthorizedLayout)/customers/_components/CustomerSearchDate'

type Props = {
  handlerRouter: (pageParameters: CustomerPageParameters) => void
} & CustomerSearchProps


const CustomerSearchContainer = ({ pageParameters, setPageParameters, handlerRouter }: Props) => {
  return (
    <SearchContainer
      firstRow={
        <>
          <CustomerSearchField pageParameters={pageParameters} setPageParameters={setPageParameters} />
          <CustomerSearchDate pageParameters={pageParameters} setPageParameters={setPageParameters} />
        </>
      }
      lastRow={
        <>
          <Box />
          <BasicButton
            label={'조회하기'}
            disabled={false}
            onClick={() => {
              setPageParameters((prev) => ({
                ...prev,
                page: 1
              }))
              handlerRouter(pageParameters)
            }}
            sx={{ width: '250px' }}
          />
        </>
      }
    >
      {null}
    </SearchContainer>
  )
}

export default CustomerSearchContainer
