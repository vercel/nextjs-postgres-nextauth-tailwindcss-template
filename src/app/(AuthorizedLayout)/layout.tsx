import { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  modal: ReactNode;
}
const AuthorizedLayout = ({ children, modal }: Props) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}

export default AuthorizedLayout
