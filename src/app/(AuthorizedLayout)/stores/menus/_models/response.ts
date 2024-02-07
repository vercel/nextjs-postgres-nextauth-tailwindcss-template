/**
 * 판매자 관리 - 메뉴 목록 - 조회 응답 DTO.
 *
 * @property index        메뉴 고유번호
 * @property createdDate  등록일
 * @property name         메뉴명
 * @property imagePath    이미지 경로
 * @property price        가격
 * @property storeId      메뉴명
 * @property storeName    이미지 URL
 * @property categoryName 메뉴 구분명
 */
interface MenuResponse {
  index: number,
  createdDate: Date,
  name: string,
  imagePath: string,
  price: number,
  storeId: string,
  storeName: string,
  categoryName: string,
}
