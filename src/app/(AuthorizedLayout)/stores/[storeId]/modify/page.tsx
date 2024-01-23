const StoreModifyPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreDetailContainer storeId={params.storeId} />
}

export default StoreModifyPage;
