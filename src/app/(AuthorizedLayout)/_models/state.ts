import { Session } from 'next-auth'

/**
 * 변경 State.
 *
 * @property isValidated      유효성 체크 통과 여부
 * @property session          세션 정보
 */
export type FormState = {
  isValidated: boolean,
  session: Session,
}
