import { PageParameters } from '@/app/(AuthorizedLayout)/_models/common'

export type MenuRequestSearchCondition = 'STORE_NAME' | 'STORE_ID'

/**
 * 메뉴 승인요청 페이지 Parameters.
 *
 * @property searchCondition  검색조건(매장명 또는 매장 ID)
 * @property searchValue      검색어
 */
export interface MenuRequestStorePageParameters extends PageParameters {
  searchCondition: MenuRequestSearchCondition,
  searchValue: string,
}

/**
 * 메뉴 승인요청 페이지 Properties.
 *
 * @property pageParameters 페이지 Parameters
 */
export interface MenuRequestStorePageProperties {
  pageParameters: MenuRequestStorePageParameters
}
