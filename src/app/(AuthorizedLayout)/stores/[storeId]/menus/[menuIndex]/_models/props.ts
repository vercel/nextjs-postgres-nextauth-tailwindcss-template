import { Session } from 'next-auth'
import { StoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuIndex]/_models/storeMenu'

export type StoreMenuProps = {
  menuIndex: number,
  storeId: string,
}

export type StoreMenuModifyFormStateInitProps = {
  menuIndex: number,
  storeId: string,
  session: Session | null,
  storeMenu: StoreMenu,
}
