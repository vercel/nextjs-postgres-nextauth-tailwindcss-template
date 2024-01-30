import { Session } from 'next-auth'
import { StoreMenuResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/response'

export type MenuProps = {
  menuId: number,
}

export type MenuModifyFormStateInitProps = {
  menuId: number,
  session: Session | null,
  menu: MenuResponse | undefined,
}
