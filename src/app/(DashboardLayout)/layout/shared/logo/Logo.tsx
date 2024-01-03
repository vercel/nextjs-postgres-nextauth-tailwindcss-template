import Link from 'next/link'
import { styled } from '@mui/material'
import Image from 'next/image'

const LinkStyled = styled(Link)(() => ({
  height: '40px',
  width: '180px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '5px',
}))

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/simbol.svg"
        alt="simbol"
        height={30}
        width={30}
        priority
      />
      <Image
        src="/images/logos/logo.svg"
        alt="logo"
        height={30}
        width={135}
        priority
      />
    </LinkStyled>
  )
}

export default Logo
