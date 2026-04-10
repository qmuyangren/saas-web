export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordParams {
  email: string
  code: string
  newPassword: string
  confirmPassword: string
}
