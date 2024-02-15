/**
 * 사용자 목록 응답 Data.
 *
 * @property id          사용자 ID
 * @property joinedDate  가입일
 * @property name        이름
 * @property phoneNumber 연락처
 */
export interface CustomerResponse {
  id: string,
  joinedDate: Date,
  name: string,
  phoneNumber: string,
}
