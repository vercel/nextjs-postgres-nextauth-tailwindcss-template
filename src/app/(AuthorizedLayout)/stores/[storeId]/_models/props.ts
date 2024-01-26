import { Session } from 'next-auth'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'

export type StoreProps = {
  storeId: string
}

export type StoreModifyFormStateInitProps = {
  storeId: string,
  session: Session | null,
  storeDetail: StoreDetailResponse | undefined
}