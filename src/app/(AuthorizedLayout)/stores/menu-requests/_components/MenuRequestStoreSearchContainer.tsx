import React from 'react'
import { BasicButton } from '@/app/_components/BasicButton'
import SearchContainer from '@/app/(AuthorizedLayout)/_components/container/SearchContainer'
import { MenuRequestStorePageParameters } from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/parameters'
import { MenuRequestSearchProps } from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/props'
import MenuRequestStoreSearchField from '@/app/(AuthorizedLayout)/stores/menu-requests/_components/MenuRequestSearchField'

type Props = {
  handlerRouter: (pageParameters: MenuRequestStorePageParameters) => void
} & MenuRequestSearchProps


const MenuRequestStoreSearchContainer = ({
  pageParameters,
  setPageParameters,
  handlerRouter
}: Props) => {
  return (
    <SearchContainer
      firstRow={
        <>
          <MenuRequestStoreSearchField
            pageParameters={pageParameters}
            setPageParameters={setPageParameters}
          />
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
      lastRow={null}
    >{}</SearchContainer>
  )
}

export default MenuRequestStoreSearchContainer
