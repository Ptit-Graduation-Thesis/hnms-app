import { createNavigationContainerRef, StackActions } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = (name: string, params = {}) => navigationRef.navigate(name as never, params as never)

export const goBack = () => navigationRef.goBack()

export const navigateReplace = (name: string, params = {}) => navigationRef.dispatch(StackActions.replace(name, params))
