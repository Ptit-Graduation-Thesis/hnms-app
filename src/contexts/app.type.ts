export type AppStateType = {
  user?: {
    id?: number
    fullName?: string
    phoneNumber?: string
    address?: string
    credentialId?: string
    dob?: string
    salary?: number
    username?: string
    role?: { id?: number; name?: string }
    branch?: { id?: number; name?: string; address?: string }
  }
  accessToken?: string
  expiresIn?: string
  language: string
}

export type UserStateType = {
  id?: number
  fullName?: string
  phoneNumber?: string
  address?: string
  credentialId?: string
  dob?: string
  salary?: number
  username?: string
  role?: { id?: number; name?: string }
  branch?: { id?: number; name?: string; address?: string }
}

export type AppActionType = {
  type: string
  payload?: any
}
