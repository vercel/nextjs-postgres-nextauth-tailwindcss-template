/**
 * 판매자 관리 - 메뉴 목록 - 조회 응답 DTO.
 *
 * @property id           메뉴 ID
 * @property createdDate  등록일
 * @property name         메뉴명
 * @property imageUrl     이미지 URL
 * @property price        가격
 * @property storeId      메뉴명
 * @property storeName    이미지 URL
 * @property categoryName 메뉴 구분명
 */
interface MenuResponse {
  id: number,
  createdDate: Date,
  name: string,
  imageUrl: string,
  price: number,
  storeId: string,
  storeName: string,
  categoryName: string,
}