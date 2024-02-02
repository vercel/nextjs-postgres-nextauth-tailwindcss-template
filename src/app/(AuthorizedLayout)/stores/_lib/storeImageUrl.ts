const URI = 'https://s3.ap-northeast-2.amazonaws.com/kr.co.dupier.thunder-order'

export const storeImageUrl = (fileName: string) => {
  return `${URI}/stores/images/${fileName}`
}
