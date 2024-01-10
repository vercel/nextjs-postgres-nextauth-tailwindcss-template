import React from 'react'

const AuthorizedLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div>
      로그인 인증된 레이아웃
      {children}
    </div>
  )
}

export default AuthorizedLayout
