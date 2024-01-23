
const StoreDocumentModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreDocumentModifyModal storeId={params.storeId} />
}

export default StoreDocumentModifyModalPage;
