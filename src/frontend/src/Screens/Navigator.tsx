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
import {Main, Main2, Main3} from '~/Screens/Main';
import {SignUp, SignUp2, SignUpDone} from '~/Screens/SignUp';
import Drawer from '~/Screens/Drawer';
import {Tutorial, Tutorial2} from '~/Screens/Tutorial'
const LoginNavigator = createStackNavigator({
    Login,
    SignUp,
    SignUp2,
});

const MainNav = createStackNavigator({
    Main,
    Main2,
    Main3,
});

const TutorialNavigator = createStackNavigator( {
    Tutorial,
    Tutorial2,

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
        TutorialNavigator,
    },
    {
        initialRouteName: 'CheckLogin',
    }
);

export default createAppContainer(AppNavigator);
  