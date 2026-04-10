export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod]

export const RequestStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]
