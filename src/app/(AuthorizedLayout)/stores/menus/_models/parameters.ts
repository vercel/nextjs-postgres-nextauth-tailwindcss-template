import { PageParameters } from '@/app/(AuthorizedLayout)/_models/common'
import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/store'

export type MenuSearchCondition = 'STORE_NAME' | 'STORE_ID' | 'MENU_NAME'

/**
 * 매장 페이지 Parameters.
 *
 * @property searchCondition  검색조건(매장명 또는 매장 ID)
 * @property searchValue      검색어
 * @property createdStartDate 등록일 시작일
 * @property createdEndDate   등록일 종료일
 * @property menuCategories   메뉴 구분 리스트
 * @property statuses         진행상태 리스트
 */
export interface MenuPageParameters extends PageParameters {
  searchCondition: MenuSearchCondition,
  searchValue: string,
  createdStartDate: string,
  createdEndDate: string,
  menuCategories: MenuCategory[],
}

/**
 * 메뉴 페이지 Properties.
 *
 * @property pageParameters 페이지 Parameters
 */
export interface MenuPageProperties {
  pageParameters: MenuPageParameters
}
