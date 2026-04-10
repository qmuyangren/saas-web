export const downloadFile = (url: string, filename: string) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportJson = (data: any, filename: string) => {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

export const exportExcel = (data: any, filename: string) => {
  console.log('Export to Excel:', data, filename)
}
