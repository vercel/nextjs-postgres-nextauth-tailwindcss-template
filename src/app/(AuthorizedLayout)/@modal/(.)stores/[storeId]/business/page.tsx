import StoreBusinessModifyModal
  from '@/app/(AuthorizedLayout)/stores/[storeId]/business/_components/StoreBusinessModifyModal'

const StoreBusinessModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  return <StoreBusinessModifyModal storeId={params.storeId} />
}

export default StoreBusinessModifyModalPage;
