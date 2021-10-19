export type AppStateType = {
  user?: {
    id: number
    fullName: string
    email: string
    avatar: string
  }
  accessToken?: string
}

export type AppActionType = {
  type: string
  payload?: any
}
