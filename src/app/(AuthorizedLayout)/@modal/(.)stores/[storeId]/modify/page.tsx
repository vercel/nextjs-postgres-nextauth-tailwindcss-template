import StoreModifyContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_components/StoreModifyContainer'

const StoreModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreModifyContainer storeId={params.storeId} />
}

export default StoreModifyModalPage;
