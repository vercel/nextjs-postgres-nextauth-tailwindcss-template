import { PageParameters } from '@/app/(AuthorizedLayout)/_models/common'
import { Dispatch, SetStateAction } from 'react'

export type StoreSearchCondition = 'STORE_NAME' | 'STORE_ID'

export type StoreStatus = 'NOT_DOCUMENTS_SUBMITTED' |
  'NOT_BUSINESS_REGISTERED' |
  'NOT_MENU_REGISTERED' |
  'EXPIRED_HEALTH_CERTIFICATE'

export type MenuCategory = 'MEALS' |
  'SNACKS' |
  'DESSERTS'|
  'CAFES'

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
export interface StorePageParameters extends PageParameters{
  searchCondition: StoreSearchCondition,
  searchValue: string,
  createdStartDate: string,
  createdEndDate: string,
  menuCategories: MenuCategory[],
  statuses: StoreStatus[]
}

/**
 * 매장 패이지 Properties.
 *
 * @property pageParameters 페이지 Parameters
 */
export interface StorePageProperties {
  pageParameters: StorePageParameters
}

export type StoreSearchProps = {
  pageParameters: StorePageParameters,
  setPageParameters: Dispatch<SetStateAction<StorePageParameters>>,
}
