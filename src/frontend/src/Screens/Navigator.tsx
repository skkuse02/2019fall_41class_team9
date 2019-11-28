import {
    createSwitchNavigator,
    createAppContainer,
  } from 'react-navigation';

import {
    createStackNavigator,
} from 'react-navigation-stack';

import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import Main from '~/Screens/Main';

const LoginNavigator = createStackNavigator({
    Login,
});

const MainNavigator = createStackNavigator({
    Main,
});

const AppNavigator = createSwitchNavigator(
    {
        CheckLogin,
        LoginNavigator,
        MainNavigator,
    },
    {
        initialRouteName: 'CheckLogin',
    }
);

export default createAppContainer(AppNavigator);
  