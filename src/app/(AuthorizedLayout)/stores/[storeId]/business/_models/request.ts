/**
 *  매장 사업자 정보 변경 요청 Data.
 *
 *  @property businessName            상호명
 *  @property businessNumber          사업자 등록번호
 *  @property owner                   대표자명
 *  @property businessRegistrationUrl 사업자 등록증 이미지 URL
 */
export interface StoreBusinessModifyRequest {
  businessName: string,
  businessNumber: string,
  owner: string,
  businessRegistrationUrl: string,
}
