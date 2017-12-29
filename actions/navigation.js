import { NavigationActions } from 'react-navigation'

export const navigate = (routeName, params) => NavigationActions.navigate(
  {routeName, params}
)

export const resetNavigation = ({index, routeName, params}) => NavigationActions.reset({
  index: index,
  actions: [
    NavigationActions.navigate({ routeName, params })
  ]
})
