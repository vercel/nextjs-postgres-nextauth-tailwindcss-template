/**
 매장 담당자 정보 변경 요청 Data.

 @property name         담당자명
 @property phoneNumber  담당자 연락처
 */
export interface StoreManagerModifyRequest {
  name: string,
  phoneNumber: string,
}
