import { Dispatch, SetStateAction } from 'react'
import { MenuPageParameters } from '@/app/(AuthorizedLayout)/stores/menus/_models/parameters'

/**
 * 메뉴 검색 Properties.
 */
export type MenuSearchProps = {
  pageParameters: MenuPageParameters,
  setPageParameters: Dispatch<SetStateAction<MenuPageParameters>>,
}
