import { createNavigationContainerRef, StackActions } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params = {}): void {
  navigationRef.navigate(name as never, params as never)
}

export function goBack(): void {
  navigationRef.goBack()
}

export function navigateReplace(name: string, params = {}): void {
  navigationRef.dispatch(StackActions.replace(name, params))
}
