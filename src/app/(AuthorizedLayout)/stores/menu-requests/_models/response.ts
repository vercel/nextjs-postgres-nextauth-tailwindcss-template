/**
 * 판매자 관리 - 메뉴 승인 - 조회 응답 DTO.
 *
 * @property storeId          메뉴명
 * @property storeName        이미지 URL
 * @property menuCategoryName     메뉴 구분명
 * @property requestMenuCount 승인요청 메뉴 수
 * @property requestDateTime  승인요청 일시
 */
interface MenuRequestStoreListResponse {
  storeId: string,
  storeName: string,
  menuCategoryName: string,
  requestMenuCount: number,
  requestDateTime: Date
}
