import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState, NavigationScreenOptionsGetter, NavigationActions, NavigationScreenComponent } from 'react-navigation';
import Styled from 'styled-components/native';
import MainBackground from '~/Components/MainBackground';
import {Button} from '~/Components/Button';
import { DrawerActions } from 'react-navigation-drawer';
import Navigator from '../Navigator';
import Vector from 'react-native-vector-icons/Ionicons';

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;

const Container = Styled.View`
  background-color: #f2e9e1;
  flex : 1;
`;
const ButtonIcon = Styled.TouchableOpacity``;

const Box = Styled.View`
  background-color: white;
  flex : 1;
  margin : 10px;
  margin-top : 0px;
  border-radius : 40px;
`;

const View = Styled.View `
  flex:4;
`;
const View2 = Styled.View `
  flex:1;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Main = ({ navigation }: Props) => {
  return (
    <Container>
      <ButtonIcon onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Vector
        style={{marginLeft : 10, marginTop : 10}}
        size={40}
        name='ios-menu'
        color = "gray"
      />
      </ButtonIcon>
      <Box>
        <View >
        </View>
        <View2>
          <Button style ={{height : 40, margin : 30}}
            label="오늘 음식은?"
            onPress={() => navigation.navigate('Main2')}        
          />
        </View2>
      </Box>
    </Container>
  );
};

const Main2 = ({ navigation }: Props) => {
  return (
    <Container>
      <ButtonIcon onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Vector
        style={{marginLeft : 10, marginTop : 10}}
        size={40}
        name='ios-menu'
        color = "gray"
      />
      </ButtonIcon>
      <Box>
        <View >
        </View>
        <View2>
        </View2>
      </Box>
    </Container>
  );
};

Main2.navigationOptions = {
  header : null,
};

Main.navigationOptions = {
  header : null,
}
export {Main, Main2};
