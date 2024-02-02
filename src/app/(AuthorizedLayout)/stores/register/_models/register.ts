/**
 * 매장 등록 요청 Data.
 *
 * @property id               매장 ID
 * @property name             매장명
 * @property imagePath        이미지 URL
 * @property telephone        매장 전화번호
 * @property bankName         은행명
 * @property accountNumber    계좌번호
 * @property accountHolder    예금주
 * @property businessLocation 영업 소재지
 * @property menuCategoryCode 메뉴구분 코드
 */
export interface StoreRegisterRequest {
  id: string,
  name: string,
  imagePath: string,
  telephone: string,
  bankName: string,
  accountNumber: string,
  accountHolder: string,
  businessLocation: string,
  menuCategoryCode: string,
}
