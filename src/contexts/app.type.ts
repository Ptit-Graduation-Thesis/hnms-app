export type AppStateType = {
  user?: {
    id: number
    fullName: string
    phoneNumber: string
    address: string
    credentialId: string
    dob: string
    salary: number
    role: {
      id: number
      name: string
    }
  }
  accessToken?: string
  expiresIn?: string
}

export type AppActionType = {
  type: string
  payload?: any
}
