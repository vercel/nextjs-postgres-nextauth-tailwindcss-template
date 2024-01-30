import { Session } from 'next-auth'
import { StoreMenuResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/response'

export type StoreMenuProps = {
  menuId: number,
  storeId: string,
}

export type StoreMenuModifyFormStateInitProps = {
  menuId: number,
  storeId: string,
  session: Session | null,
  storeMenu: StoreMenuResponse | undefined,
}
