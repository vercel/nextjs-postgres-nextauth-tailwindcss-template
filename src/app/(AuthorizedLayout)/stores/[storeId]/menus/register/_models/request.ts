/**
 * 매장 메뉴 등록 요청 Data.
 *
 * @property name        메뉴명
 * @property englishName 영문 메뉴명
 * @property price       가격
 * @property imagePath   이미지 경로
 * @property allergies   원산지 및 알러지 정보
 * @property description 상품설명
 */
export interface StoreMenuRegisterRequest {
  name: string,
  englishName?: string,
  price: number,
  imagePath: string,
  allergies?: string,
  description: string,
}
