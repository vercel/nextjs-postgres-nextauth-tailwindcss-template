import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'
import { passwordRegex } from '@/app/(AuthorizedLayout)/_lib/string'

export const idValidated = (id: string) => {
  let errorMessage = '';
  if (id === '') {
    errorMessage = '매장 ID를 입력해주세요.'
  } else if (!id.match(/[a-zA-Z0-9]{1,50}/)) {
    errorMessage = "매장 ID를 확인해주세요."
  }
  return errorMessage
}

export const nameValidated = (name: string) => {
  let errorMessage = '';
  if (name === '') {
    errorMessage = '매장명을 입력해주세요.'
  } else if (Buffer.byteLength(name) > 120 || name.length > 60) {
    errorMessage = '매장명을 확인해주세요.'
  }
  return errorMessage
}

export const telephoneValidated = (telephone: string) => {
  let errorMessage = '';
  if (telephone !== '' && formatPhoneNumber(telephone) === undefined) {
    errorMessage = '매장 전화번호를 확인해주세요.'
  }
  return errorMessage
}

export const bankNameValidated = (bankName: string) => {
  let errorMessage = '';
  if (bankName !== '' && Buffer.byteLength(bankName) > 50) {
    errorMessage = '은행을 확인해주세요.'
  }
  return errorMessage
}

export const accountHolderValidated = (accountHolder: string) => {
  let errorMessage = '';
  if (accountHolder !== '' && Buffer.byteLength(accountHolder) > 50) {
    errorMessage = '예금주를 확인해주세요.'
  }
  return errorMessage
}

export const accountNumberValidated = (accountNumber: string) => {
  let errorMessage = '';
  if (accountNumber !== '' && !accountNumber.match(/[0-9-]{1,50}/)) {
    errorMessage = '계좌번호를 확인해주세요.'
  }
  return errorMessage
}

export const businessLocationValidated = (businessLocation: string) => {
  let errorMessage = '';
  if (businessLocation !== '' && Buffer.byteLength(businessLocation) > 255) {
    errorMessage = '영업 소재지를 확인해주세요.'
  }
  return errorMessage
}

export const passwordValidated = (password: string) => {
  let errorMessage = '';
  if (password === '') {
    errorMessage = '비밀번호를 입력해주세요.'
  } else if (!password.match(passwordRegex)) {
    errorMessage = '비밀번호를 확인해주세요.'
  }
  return errorMessage
}

export const confirmPasswordValidated = (password: string, confirmPassword: string) => {
  let errorMessage = '';
  if (confirmPassword === '') {
    errorMessage = '비밀번호 확인을 입력해주세요.'
  } else if (!confirmPassword.match(passwordRegex)) {
    errorMessage = '비밀번호 확인을 확인해주세요.'
  } else if (password !== confirmPassword) {
    errorMessage = '비밀번호가 일치하지 않습니다.'
  }
  return errorMessage
}
