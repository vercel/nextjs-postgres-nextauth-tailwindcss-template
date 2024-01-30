/**
 * 판매자 관리 - 메뉴 목록 - 조회 응답 DTO.
 *
 * @property id           메뉴 ID
 * @property storeId      매장 ID
 * @property name         메뉴명
 * @property englishName  영문 메뉴명
 * @property price        가격
 * @property imageUrl     이미지 URL
 * @property allergies    원산지 및 알러지 정보
 * @property description  상품설명
 * @property createdDate  등록일
 */
interface MenuResponse {
  id: number,
  storeId: string,
  name: string,
  englishName: string,
  price: number,
  imageUrl: string,
  allergies: string,
  description: string,
  createdDate: Date
}
