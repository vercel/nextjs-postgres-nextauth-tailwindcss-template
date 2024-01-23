import { FormState } from '@/app/(AuthorizedLayout)/_models/state'

/**
 * 매장 변경 Form State.
 *
 * @property storeId 매장 ID
 */
export type StoreModifyFormState = {
  storeId: string
} & FormState
