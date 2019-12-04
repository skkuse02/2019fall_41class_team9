import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #141414;
  justify-content: center;
  align-items: center;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const CheckLogin = ({ navigation }: Props) => {

  /*
  AsyncStorage.getItem('key')
    .then(value => {
      if (value) {
        AsyncStorage.getItem('tutorial')
          .then(value2 => {
              if(value2 === "ok")
                navigation.navigate('MainNavigator');
              else
                navigation.navigate('Tutorial');
          })

      } else {
        navigation.navigate('LoginNavigator');
      }
    })
    .catch((error: Error) => {
      console.log(error);
    });
  */
  navigation.navigate('MainNav');


  return (
    <Container>
      <ActivityIndicator size="large" color="#E70915" />
    </Container>
  );
};

CheckLogin.navigationOptions = {
  header: null,
};

export default CheckLogin;
