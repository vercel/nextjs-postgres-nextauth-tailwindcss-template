import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/props'

/**
 매장 정보 변경 요청 Data.

 @property name             매장명
 @property imagePath        이미지 URL
 @property telephone        매장 전화번호
 @property bankName         은행명
 @property accountNumber    계좌번호
 @property accountHolder    예금주
 @property businessLocation 영업 소재지
 @property menuCategoryCode 메뉴구분
 */
export interface StoreModifyRequest {
  name: string,
  imagePath: string,
  telephone: string,
  bankName: string,
  accountNumber: string,
  accountHolder: string,
  businessLocation: string,
  menuCategoryCode: MenuCategory,
}
