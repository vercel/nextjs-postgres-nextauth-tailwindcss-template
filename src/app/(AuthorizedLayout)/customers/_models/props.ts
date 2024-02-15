import { PageParameters } from '@/app/(AuthorizedLayout)/_models/common'
import { Dispatch, SetStateAction } from 'react'

export type CustomerSearchCondition = 'CUSTOMER_ID' | 'NAME' | 'PHONE_NUMBER'

/**
 * 사용자 페이지 Parameters.
 *
 * @property searchCondition  검색조건
 * @property searchValue      검색어
 * @property joinedStartDate  가입일 시작일
 * @property joinedEndDate    가입일 종료일
 */
export interface CustomerPageParameters extends PageParameters{
  searchCondition: CustomerSearchCondition,
  searchValue: string,
  joinedStartDate: string,
  joinedEndDate: string,
}

/**
 * 사용자 패이지 Properties.
 *
 * @property pageParameters 페이지 Parameters
 */
export interface CustomerPageProperties {
  pageParameters: CustomerPageParameters
}

export type CustomerSearchProps = {
  pageParameters: CustomerPageParameters,
  setPageParameters: Dispatch<SetStateAction<CustomerPageParameters>>,
}
