import React from 'react'
import { StorePageParameters, StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/store'
import StoreSearchField from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchField'
import StoreSearchDate from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchDate'
import StoreSearchStatus from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchStatus'
import StoreSearchMenuCategory from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchMenuCategory'
import { BasicButton } from '@/app/_components/BasicButton'
import SearchContainer from '@/app/(AuthorizedLayout)/_components/container/SearchContainer'

type Props = {
  handlerRouter: (pageParameters: StorePageParameters) => void
} & StoreSearchProps


const StoreSearchContainer = ({ pageParameters, setPageParameters, handlerRouter }: Props) => {
  return (
    <SearchContainer
      firstRow={
        <>
          <StoreSearchField pageParameters={pageParameters} setPageParameters={setPageParameters} />
          <StoreSearchDate pageParameters={pageParameters} setPageParameters={setPageParameters} />
        </>
      }
      lastRow={
        <>
          <StoreSearchMenuCategory pageParameters={pageParameters} setPageParameters={setPageParameters} />
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
      <StoreSearchStatus pageParameters={pageParameters} setPageParameters={setPageParameters} />
    </SearchContainer>
  )
}

export default StoreSearchContainer
