import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'
import StoreMenuModifyModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_components/StoreMenuModifyModal'
import MenuModifyModal from '@/app/(AuthorizedLayout)/stores/menus/[menuId]/_components/MenuModifyModal'

const StoreMenuRegisterModalPage = ({ params }: { params: { menuId: number } }) => {
  return(
    <Suspense fallback={<Loading />}>
      <MenuModifyModal menuId={params.menuId} />
    </Suspense>)
}

export default StoreMenuRegisterModalPage;
