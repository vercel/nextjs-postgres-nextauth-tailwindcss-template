import { FormState } from '@/app/(AuthorizedLayout)/_models/state'

/**
 * 매장 변경 Form State.
 *
 * @property id 매장 ID
 */
export type StoreModifyFormState = {
  id: string
} & FormState
