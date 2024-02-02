import Link from 'next/link'
import Image from 'next/image'
import styles from './logo.module.css'

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
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
    </Link>
  )
}

export default Logo
