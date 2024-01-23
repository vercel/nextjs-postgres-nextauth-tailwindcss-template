

export const isNotEmpty = (string?: string) => {
  if (string == undefined) {
    return false
  }

  return string !== ''
}
