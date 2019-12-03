import {
    createSwitchNavigator,
    createAppContainer,
  } from 'react-navigation';

import {
    createStackNavigator,
} from 'react-navigation-stack';

import {
    createDrawerNavigator, DrawerActions,
} from 'react-navigation-drawer';
import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import {Main, Main2} from '~/Screens/Main';
import {SignUp, SignUp2, SignUpDone} from '~/Screens/SignUp';
import Drawer from '~/Screens/Drawer';
const LoginNavigator = createStackNavigator({
    Login,
    SignUp,
    SignUp2,
});

const MainNav = createStackNavigator({
    Main,
    Main2,
});

const MainNavigator = createDrawerNavigator(
    {
        MainNav,
    },
    {
        drawerPosition : 'left',
        drawerType : 'front',
        contentComponent : Drawer,
    }
);

const SignUpDoneNavigator = createStackNavigator( {
    SignUpDone,
});



const AppNavigator = createSwitchNavigator(
    {
        CheckLogin,
        LoginNavigator,
        MainNavigator,
        SignUpDoneNavigator,
    },
    {
        initialRouteName: 'CheckLogin',
    }
);

export default createAppContainer(AppNavigator);
  