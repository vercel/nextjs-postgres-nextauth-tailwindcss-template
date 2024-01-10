import { NextPage } from 'next'
import Link from 'next/link'

const NotFound: NextPage = () => {
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다.</div>
      <Link href="/dashboard">돌아가기</Link>
    </div>
  )
}

export default NotFound