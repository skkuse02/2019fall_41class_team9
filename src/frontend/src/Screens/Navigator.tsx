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
import {SignUp, SignUp2, SignUpDone} from '~/Screens/SignUp';

const LoginNavigator = createStackNavigator({
    Login,
    SignUp,
    SignUp2,
});


const MainNavigator = createStackNavigator({
    Main,
});

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
  