export const formatPhoneNumber = (input?: string): string | undefined => {
  if (input === undefined) {
    return undefined
  }

  const cleanInput = input.replaceAll(/[^0-9]/g, '')
  let result = ''
  const length = cleanInput.length
  if (length === 8) {
    result = cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2')
  } else if (cleanInput.startsWith('02') && (length === 9 || length === 10)) {
    result = cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3')
  } else if (!cleanInput.startsWith('02') && (length === 10 || length === 11)) {
    result = cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
  } else {
    return undefined
  }
  return result
}
