import StoreDetailContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreDetailContainer'

const StoreDocumentModifyPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreDetailContainer storeId={params.storeId} />
}

export default StoreDocumentModifyPage;
