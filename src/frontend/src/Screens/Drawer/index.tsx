import React from 'react';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const Header = Styled.View`
  border-bottom-width: 1px;
  border-color: #D3D3D3;
  padding: 8px 16px;
  margin-bottom : 20px;
`;
const Title = Styled.Text`
  font-size : 17px;
`;
const Button = Styled.TouchableOpacity`
  padding: 8px 16px;
  
`;
const ButtonContainer = Styled.View`
  flex-direction: row;
  align-items: center;
`;
const Label = Styled.Text`
  font-size: 20px;
`;
const Footer = Styled.View`
  position: absolute;
  bottom: 32px;
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Drawer = ({ navigation }: Props) => {
  return (
    <Container>
      <Header>
        <Title>Sara Lambert</Title>
      </Header>
      <Button>
        <ButtonContainer>
          <Icon
            style={{marginRight : 10}}
            size={30}
            name='person'
            color = "black"
            
          />
          <Label>내정보</Label>
        </ButtonContainer>
      </Button>
      <Footer>
        <Button onPress = {() => {
          AsyncStorage.removeItem('key');
          AsyncStorage.removeItem('tutorial');

          navigation.navigate('CheckLogin');
        }}>
          <ButtonContainer>
            <Icon2
              style={{marginRight : 10}}
              size={30}
              name='logout'
              color = "black"      
            />
            <Title>로그아웃</Title>
          </ButtonContainer>
        </Button>
      </Footer>
    </Container>
  );
};

export default Drawer;
