import StoreManagerModifyContainer from "@/app/(AuthorizedLayout)/stores/[storeId]/manager/_components/StoreManagerModifyContainer";

const StoreManagerModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreManagerModifyContainer storeId={params.storeId} />
}

export default StoreManagerModifyModalPage;
