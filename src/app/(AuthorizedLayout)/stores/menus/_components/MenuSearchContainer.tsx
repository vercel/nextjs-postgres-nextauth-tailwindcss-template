import React from 'react'
import { BasicButton } from '@/app/_components/BasicButton'
import { MenuPageParameters } from '@/app/(AuthorizedLayout)/stores/menus/_models/parameters'
import { MenuSearchProps } from '@/app/(AuthorizedLayout)/stores/menus/_models/props'
import MenuSearchField from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuSearchField'
import MenuSearchDate from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuSearchDate'
import MenuSearchMenuCategory from '@/app/(AuthorizedLayout)/stores/menus/_components/MenuSearchMenuCategory'
import SearchContainer from '@/app/(AuthorizedLayout)/_components/container/SearchContainer'

type Props = {
  handlerRouter: (pageParameters: MenuPageParameters) => void
} & MenuSearchProps


const MenuSearchContainer = ({ pageParameters, setPageParameters, handlerRouter }: Props) => {
  return (
    <SearchContainer
      firstRow={
        <>
          <MenuSearchField pageParameters={pageParameters} setPageParameters={setPageParameters} />
          <MenuSearchDate pageParameters={pageParameters} setPageParameters={setPageParameters} />
        </>
      }
      lastRow={
        <>
          <MenuSearchMenuCategory pageParameters={pageParameters} setPageParameters={setPageParameters} />
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
    >{}</SearchContainer>
  )
}

export default MenuSearchContainer
