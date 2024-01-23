
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,64}$/;

export const isNotEmpty = (string?: string) => {
  if (string == undefined) {
    return false
  }

  return string !== ''
}
