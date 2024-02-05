import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/props'

/**
 * 매장 상세 응답 Data.
 *
 * @property id                       매장 아이디
 * @property name                     매장명
 * @property imagePath                이미지 URL
 * @property telephone                매장 전화번호
 * @property bankName                 은행
 * @property accountNumber            계좌번호
 * @property accountHolder            예금주
 * @property menuCategoryCode         메뉴구분
 * @property businessLocation         영업 소재지
 * @property managerName              담당자명
 * @property managerPhoneNumber       담당자 연락처
 * @property businessName             상호명
 * @property businessNumber           사업자 등록번호
 * @property owner                    대표자명
 * @property businessRegistrationPath 사업자 등록증 URL
 * @property healthCertRegisterDate   보건증 등록일
 * @property healthCertExpirationDate 보건증 만기일
 * @property healthCertPath           보건증 URL
 * @property carRegistrationCertPath  자동차 등록증 URL
 * @property businessReportCertPath   영업 신고증 URL
 * @property menuCount                메뉴 수
 */
export interface StoreDetailResponse {
  id: string,
  name: string,
  imagePath: string,
  telephone: string,
  bankName: string,
  accountNumber: string,
  accountHolder: string,
  menuCategoryCode: MenuCategory,
  businessLocation: string,
  managerName: string,
  managerPhoneNumber: string,
  businessName: string,
  businessNumber: string,
  owner: string,
  businessRegistrationPath?: string,
  healthCertRegisterDate?: Date,
  healthCertExpirationDate?: Date,
  healthCertPath?: string,
  carRegistrationCertPath?: string,
  businessReportCertPath?: string,
  menuCount: number,
}
