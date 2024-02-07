import { Dispatch, SetStateAction } from 'react'
import { MenuRequestStorePageParameters } from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/parameters'

/**
 * 메뉴 승인요청 검색 Properties.
 */
export type MenuRequestSearchProps = {
  pageParameters: MenuRequestStorePageParameters,
  setPageParameters: Dispatch<SetStateAction<MenuRequestStorePageParameters>>,
}
