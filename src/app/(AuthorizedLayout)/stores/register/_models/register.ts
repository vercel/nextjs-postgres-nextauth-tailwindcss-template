/**
 * 매장 등록 요청 Data.
 *
 * @property storeId          매장 ID
 * @property storeName        매장명
 * @property imageUrl         이미지 URL
 * @property storeTel         매장 전화번호
 * @property bank             은행명
 * @property accountNumber    계좌번호
 * @property accountHolder    예금주
 * @property businessLocation 영업 소재지
 * @property category         메뉴구분
 */
export interface StoreRegisterRequest {
  storeId: string,
  storeName: string,
  imageUrl: string,
  storeTel: string,
  bank: string,
  accountNumber: string,
  accountHolder: string,
  businessLocation: string,
  category: string,
}
