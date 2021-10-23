import { LoginType } from '@/types/login.types'

export const validateLogin = (loginInfo: LoginType | undefined) => {
  if (!loginInfo) return false
  if (!loginInfo.username) return false
  if (!loginInfo.password) return false
  if (loginInfo.password.length < 6) return false

  return true
}
