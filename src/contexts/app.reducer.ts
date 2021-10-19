import { AppActionType, AppStateType } from '@/contexts/app.type'
import { ActionType } from '@/contexts/app.action'

export const initialState: AppStateType = {}

export const AppReducer = (state: AppStateType, action: AppActionType) => {
  switch (action.type) {
    case ActionType.UPDATE_CONTEXT:
      return { ...state, ...action.payload }

    case ActionType.REMOVE_CONTEXT:
      return {}

    default:
      return state
  }
}
