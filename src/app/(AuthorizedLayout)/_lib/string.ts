
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,64}$/;
export const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

export const isNotEmpty = (string?: string) => {
  if (string == undefined) {
    return false
  }

  return string !== ''
}
