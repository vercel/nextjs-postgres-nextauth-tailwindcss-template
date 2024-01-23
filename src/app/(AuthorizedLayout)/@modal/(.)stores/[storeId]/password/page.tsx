import StorePasswordModifyModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/password/_components/StorePasswordModifyModal'

const StorePasswordModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return <StorePasswordModifyModal storeId={params.storeId} />
}

export default StorePasswordModifyModalPage;
