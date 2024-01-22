import { StorePageProperties } from '@/app/(AuthorizedLayout)/stores/_models/store'
import StoreListContainer from '@/app/(AuthorizedLayout)/stores/_components/StoreListContainer'
import StoreRegisterModal from '@/app/(AuthorizedLayout)/stores/register/_components/StoreRegisterModal'

const StoreRegisterModalPage = async ({ pageParameters }: StorePageProperties) => {
  // @ts-ignore
  return <StoreRegisterModal pageParameters={pageParameters} />
}

export default StoreRegisterModalPage;
