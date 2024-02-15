import { emailRegex } from '@/app/(AuthorizedLayout)/_lib/string'

export const modifyIdValidated = (modifyId: string) => {
  let errorMessage = '';
  if (modifyId === '') {
    errorMessage = '사용자 ID를 입력해주세요.'
  } else if (!modifyId.match(emailRegex)) {
    errorMessage = '사용자 ID를 확인해주세요.'
  }
  return errorMessage
}
