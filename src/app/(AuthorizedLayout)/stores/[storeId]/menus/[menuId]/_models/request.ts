/**
 * 매장 메뉴 수정 요청 Data.
 *
 * @property name        메뉴명
 * @property englishName 영문 메뉴명
 * @property price           가격
 * @property imageUrl        이미지 URL
 * @property allergies       원산지 및 알러지 정보
 * @property description     상품설명
 */
export interface StoreMenuModifyRequest {
  name: string,
  englishName?: string,
  price: number,
  imageUrl: string,
  allergies?: string,
  description: string,
}
