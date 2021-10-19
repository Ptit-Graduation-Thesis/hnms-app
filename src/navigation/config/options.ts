import { CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack'

import transition from '@/navigation/config/transition'

const navigationConfigs: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: true,
  cardOverlayEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: transition,
    close: transition,
  },
}

export default navigationConfigs
