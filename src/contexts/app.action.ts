import { AppStateType, UserStateType } from '@/contexts/app.type'

export enum ActionType {
  UPDATE_CONTEXT = '@APP/UPDATE_CONTEXT',
  UPDATE_USER = '@APP/UPDATE_USER',
  REMOVE_CONTEXT = '@APP/REMOVE_CONTEXT',
  CHANGE_LANGUAGE = '@APP/CHANGE_LANGUAGE',
}

export const updateContext = (payload: AppStateType) => ({
  type: ActionType.UPDATE_CONTEXT,
  payload,
})

export const updateUser = (payload: UserStateType) => ({
  type: ActionType.UPDATE_USER,
  payload,
})

export const removeContext = () => ({
  type: ActionType.REMOVE_CONTEXT,
})

export const changeLanguage = (payload: string) => ({
  type: ActionType.CHANGE_LANGUAGE,
  payload,
})
