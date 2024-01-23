/**
 *  매장 필수 서류 정보 변경 요청 Data.
 *
 *  @property healthCertUrl          보건증 URL
 *  @property healthCertRegisterDate 보건증 등록일
 *  @property carRegistrationCertUrl 자동차 등록증 URL
 *  @property businessReportCertUrl  영업신고증 URL
 */
export interface StoreDocumentsModifyRequest {
  healthCertUrl: string,
  healthCertRegisterDate: string,
  carRegistrationCertUrl: string,
  businessReportCertUrl: string,
}
