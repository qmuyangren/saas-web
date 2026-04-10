export const formatNumber = (num: number, decimals = 2) => {
  return Number(num).toFixed(decimals)
}

export const formatCurrency = (num: number, currency = '¥') => {
  return `${currency}${formatNumber(num, 2)}`
}

export const formatPercent = (num: number, decimals = 2) => {
  return `${formatNumber(num * 100, decimals)}%`
}

export const formatThousands = (num: number) => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
