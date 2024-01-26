/**
 * 판매자 관리 - 매장 목록 - 매장의 메뉴 상세 정보 응답 DTO.
 *
 * @property id          메뉴 ID
 * @property createdDate 등록일
 * @property imageUrl    이미지 URL
 * @property name        메뉴명
 * @property price       가격
 */
interface StoreMenuDetailResponse {
  id: string,
  createdDate: Date,
  imageUrl: string,
  name: string,
  price: string,
}
