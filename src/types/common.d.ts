declare module 'thunder-order' {
  /**
   * 공통 응답정보.
   *
   * @property resultCode 결과 코드
   * @property message    결과 메시지
   * @property data       응답 데이터
   */
  interface Response<T> {
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
  interface Page<T> {
    pages: number
    elements: number
    contents: T[]
  }
}
