/**
 * 매장 메뉴 등록 요청 Data.
 *
 * @property menuName        메뉴명
 * @property menuEnglishName 영문 메뉴명
 * @property price           가격
 * @property imageUrl        이미지 URL
 * @property allergies       원산지 및 알러지 정보
 * @property description     상품설명
 */
export interface StoreMenuRegisterRequest {
  menuName: string,
  menuEnglishName?: string,
  price: number,
  imageUrl: string,
  allergies?: string,
  description: string,
}
