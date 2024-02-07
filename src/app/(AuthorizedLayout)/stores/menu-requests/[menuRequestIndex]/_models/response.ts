/**
 *  메뉴 조회 응답 Data.
 *
 *  @property index        메뉴 고유번호
 *  @property storeId      매장 ID
 *  @property name         메뉴명
 *  @property englishName  영문 메뉴명
 *  @property price        가격
 *  @property imagePath    이미지 경로
 *  @property allergies    원산지 및 알러지 정보
 *  @property description  상품설명
 *  @property createdDate  등록일
 */
export interface MenuResponse {
  index: number,
  storeId: string,
  name: string,
  englishName: string,
  price: number,
  imagePath: string,
  allergies: string,
  description: string,
  createdDate: Date
}
