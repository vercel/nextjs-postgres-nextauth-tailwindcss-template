import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/store'

/**
 * 매장 상세 응답 Data.
 *
 * @property storeId                     매장 아이디
 * @property storeName                   매장명
 * @property imageUrl                    이미지 URL
 * @property storeTel                    매장 전화번호
 * @property bank                        은행
 * @property accountNumber               계좌번호
 * @property accountHolder               예금주
 * @property category                    메뉴구분
 * @property businessLocation            영업 소재지
 * @property managerName                 담당자명
 * @property managerPhoneNumber          담당자 연락처
 * @property businessName                상호명
 * @property businessNumber              사업자 등록번호
 * @property owner                       대표자명
 * @property businessRegistrationUrl     사업자 등록증 이미지 URL
 * @property healthCertRegisterDate      보건증 등록일
 * @property healthCertExpirationDate    보건증 만기일
 * @property healthCertImageUrl          보건증 이미지 URL
 * @property carRegistrationCertImageUrl 자동차 등록증 이미지 URL
 * @property businessReportCertImageUrl  영업 신고증 이미지 URL
 * @property menuCount                   메뉴 수
 */
export interface StoreDetailResponse {
  storeId: string,
  storeName: string,
  imageUrl: string,
  storeTel: string,
  bank: string,
  accountNumber: string,
  accountHolder: string,
  category: MenuCategory,
  businessLocation: string,
  managerName: string,
  managerPhoneNumber: string,
  businessName: string,
  businessNumber: string,
  owner: string,
  businessRegistrationUrl?: string,
  healthCertRegisterDate?: Date,
  healthCertExpirationDate?: Date,
  healthCertImageUrl?: string,
  carRegistrationCertImageUrl?: string,
  businessReportCertImageUrl?: string,
  menuCount: number,
}
