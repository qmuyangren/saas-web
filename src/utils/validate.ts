export const isEmail = (value: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
}

export const isPhone = (value: string) => {
  return /^1[3-9]\d{9}$/.test(value)
}

export const isUrl = (value: string) => {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
}

export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === ''
}

export const isValidPassword = (value: string) => {
  return value.length >= 6
}
