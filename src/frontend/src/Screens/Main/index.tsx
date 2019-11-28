import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';

const Container = Styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Main = ({ navigation }: Props) => {
  const _logout = () => {
    AsyncStorage.removeItem('key');
    navigation.navigate('LoginNavigator');
  };

  useEffect(() => {
    navigation.setParams({
      logout: _logout,
    });
  }, []);

  return (
    <Container>
    </Container>
  );
};

export default Main;
