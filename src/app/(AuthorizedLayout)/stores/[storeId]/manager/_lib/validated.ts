import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'
import { passwordRegex } from '@/app/(AuthorizedLayout)/_lib/string'

export const managerNameValidated = (managerName: string) => {
  let errorMessage = '';
  if (Buffer.byteLength(managerName) > 50) {
    errorMessage = '담당자명을 확인해주세요.'
  }
  return errorMessage
}

export const managerPhoneNumberValidated = (managerPhoneNumber: string) => {
  let errorMessage = '';
  if (managerPhoneNumber !== '' && formatPhoneNumber(managerPhoneNumber) === undefined) {
    errorMessage = '담당자 연락처를 확인해주세요.'
  }
  return errorMessage
}
