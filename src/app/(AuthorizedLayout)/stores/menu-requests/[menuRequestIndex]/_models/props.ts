import { Session } from 'next-auth'

export type MenuProps = {
  menuIndex: number,
}

export type MenuModifyFormStateInitProps = {
  menuIndex: number,
  session: Session | null,
  menu: MenuResponse | undefined,
}
