import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'
import MenuModifyModal from '@/app/(AuthorizedLayout)/stores/menus/[menuIndex]/_components/MenuModifyModal'

const StoreMenuRegisterModalPage = ({ params }: { params: { menuIndex: number } }) => {
  return(
    <Suspense fallback={<Loading />}>
      <MenuModifyModal menuIndex={params.menuIndex} />
    </Suspense>)
}

export default StoreMenuRegisterModalPage;
