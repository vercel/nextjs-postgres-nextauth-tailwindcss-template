import { Session } from 'next-auth'
import { StoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/storeMenu'

export type StoreMenuProps = {
  menuId: number,
  storeId: string,
}

export type StoreMenuModifyFormStateInitProps = {
  menuId: number,
  storeId: string,
  session: Session | null,
  storeMenu: StoreMenu,
}
