import { AppStateType } from '@/contexts/app.type'

export enum ActionType {
  UPDATE_CONTEXT = '@APP/UPDATE_CONTEXT',
  REMOVE_CONTEXT = '@APP/REMOVE_CONTEXT',
}

export const updateContext = (payload: AppStateType) => ({
  type: ActionType.UPDATE_CONTEXT,
  payload,
})

export const removeContext = () => ({
  type: ActionType.REMOVE_CONTEXT,
})
