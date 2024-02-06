/**
 *  매장 필수 서류 정보 변경 요청 Data.
 *
 *  @property healthCertPath          보건증 URL
 *  @property healthCertRegisterDate 보건증 등록일
 *  @property carRegistrationCertPath 자동차 등록증 URL
 *  @property businessReportCertPath  영업신고증 URL
 */
export interface StoreDocumentsModifyRequest {
  healthCertPath: string,
  healthCertRegisterDate: string,
  carRegistrationCertPath: string,
  businessReportCertPath: string,
}
