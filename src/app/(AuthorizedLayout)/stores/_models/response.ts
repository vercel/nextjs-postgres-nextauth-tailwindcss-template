/**
 * 매장 목록 응답 Data.
 *
 * @property id                       매장 ID
 * @property createdDate              등록일
 * @property name                     매장명
 * @property menuCategoryName         메뉴구분
 * @property isBusinessRegistered     사업자 등록 여부
 * @property menuCount                메뉴 수
 * @property submittedDocumentCount   필수서류 제출 수
 * @property healthCertRegisterDate   보건증 발급일
 * @property healthCertExpirationDate 보건증 만기일
 * @property imagePath                이미지 경로
 */
export interface StoreResponse {
  id: string,
  createdDate: Date,
  name: string,
  menuCategoryName: string,
  isBusinessRegistered: boolean,
  menuCount: number,
  submittedDocumentCount: number,
  healthCertRegisterDate: Date,
  healthCertExpirationDate: Date,
  imagePath: string,
}
