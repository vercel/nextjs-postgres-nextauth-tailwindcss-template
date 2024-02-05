/**
 *  매장 사업자 정보 변경 요청 Data.
 *
 *  @property name             상호명
 *  @property number           사업자 등록번호
 *  @property owner            대표자명
 *  @property registrationPath 사업자 등록증 경로
 */
export interface StoreBusinessModifyRequest {
  name: string,
  number: string,
  owner: string,
  registrationPath: string,
}
