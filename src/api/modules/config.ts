import { http } from '../request'

export const getConfigList = (params?: any) => {
  return http.get('/system/configs', { params })
}

export const getConfigDetail = (id: string) => {
  return http.get(`/system/configs/${id}`)
}

export const createConfig = (data: any) => {
  return http.post('/system/configs', data)
}

export const updateConfig = (id: string, data: any) => {
  return http.put(`/system/configs/${id}`, data)
}

export const deleteConfig = (id: string) => {
  return http.delete(`/system/configs/${id}`)
}
