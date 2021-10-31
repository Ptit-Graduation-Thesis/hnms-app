import { AppActionType, AppStateType } from '@/contexts/app.type'
import { ActionType } from '@/contexts/app.action'

export const initialState: AppStateType = { language: 'en' }

export const AppReducer = (state: AppStateType, action: AppActionType): AppStateType => {
  switch (action.type) {
    case ActionType.UPDATE_CONTEXT:
      return { ...state, ...action.payload }

    case ActionType.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } }

    case ActionType.REMOVE_CONTEXT:
      return initialState

    case ActionType.CHANGE_LANGUAGE:
      return { ...state, language: action.payload }

    default:
      return state
  }
}
