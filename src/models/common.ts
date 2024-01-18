/**
 * 공통 응답정보.
 *
 * @property resultCode 결과 코드
 * @property message    결과 메시지
 * @property data       응답 데이터
 */
export interface ResponseData<T> {
  resultCode: string
  message: string
  data?: T
}

/**
 * 페이징.
 *
 * @property pages     총 페이지 수
 * @property elements  총 데이터 수
 * @property contents  데이터 리스트
 */
export interface Page<T> {
  pages: number
  elements: number
  contents: T[]
}

/**
 * 페이지 Parameters.
 *
 * @property page 페이지 번호
 */
export interface PageParameters {
  page: number,
}

/**
 * 패애지 Properties.
 *
 * @property pageParameters 페이지 Parameters
 */
export interface PageProperties {
  pageParameters: PageParameters
}
