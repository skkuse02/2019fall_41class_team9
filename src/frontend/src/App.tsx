import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen';
interface Props {}

const App = ({  }: Props) => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </>
  );
};

export default App;