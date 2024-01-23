/**
 매장 담당자 정보 변경 요청 Data.

 @property managerName         담당자명
 @property managerPhoneNumber  담당자 연락처
 */
export interface StoreManagerModifyRequest {
  managerName: string,
  managerPhoneNumber: string,
}
