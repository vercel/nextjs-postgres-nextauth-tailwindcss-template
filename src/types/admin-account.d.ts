declare module 'thunder-order/accounts' {
  /**
   * 관리자 계정.
   *
   * @property id            관리자 로그인 ID
   * @property password      관리자 로그인 비밀번호
   * @property name          이름
   * @property phoneNumber   연락처
   * @property lastUpdatedAt 등록 / 수정일
   */
  interface AdminAccount {
    id: string
    password?: string
    name: string
    phoneNumber: string
    lastUpdatedAt?: DateTime
  }
}
