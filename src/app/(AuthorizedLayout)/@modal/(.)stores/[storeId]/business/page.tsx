import StoreBusinessModifyContainer
  from '@/app/(AuthorizedLayout)/stores/[storeId]/business/_components/StoreBusinessModifyContainer'

const StoreBusinessModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreBusinessModifyContainer storeId={params.storeId} />
}

export default StoreBusinessModifyModalPage;
