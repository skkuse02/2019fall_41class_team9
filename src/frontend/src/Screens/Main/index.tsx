import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState, NavigationScreenOptionsGetter, NavigationActions, NavigationScreenComponent } from 'react-navigation';
import Styled from 'styled-components/native';
import MainBackground from '~/Components/MainBackground';
import {Button} from '~/Components/Button';
import { DrawerActions } from 'react-navigation-drawer';
import Navigator from '../Navigator';
import Vector from 'react-native-vector-icons/Ionicons';
import Slider from '~/Components/Slider';
import {Alert} from 'react-native'

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
  flex:6;
`;
const View2 = Styled.View `
  flex:4;
`;
const View3 = Styled.View `
  margin : 20px;
`;

const Title = Styled.Text `
  font-size : 20px;
  font-weight : bold;
  flex :1;
  margin : 20px;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Main = ({ navigation }: Props) => {
  const [people, setPeople] = useState<Number>(1);
  const [price, setPrice] = useState<Number>(5);

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
        <Title>오늘 음식은?</Title>
        <View>
          <Slider
            style={{margin : 100, padding : 10}} width={330}
            height={50} title={'인원을 선택해주세요'} 
            min={1} max={10} value={1}  units={'명'}
            backgroundColor= {['rgb(3, 169, 244)', 'rgb(255, 87, 34)']}
            onPressOut = {(value) => {setPeople(value)}}
          />
          <View3></View3>
          <Slider
            style={{margin : 100, padding : 10}} width={330}
            height={50} title={'가격대를 선택해주세요'} 
            min={5} max={100} value={5}  units={'000원'}
            backgroundColor= {['rgb(3, 169, 244)', 'rgb(255, 152, 0)', 'rgb(255, 87, 34)']}
            onPressOut = {(value) => {setPrice(value)}}
          />
        </View>
        <View2>
          <Button style ={{height : 40, margin : 30}}
            label="추천음식 보기"
            onPress={() => {
              const key = AsyncStorage.getItem('key');
              fetch("https://www.aaadfsv.ccsg", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  key : key,
                  people: people,
                  price: price,
                })
              })
                .then((response) => response.json())
                .then((json) => {
                  if(json.login ==='ok') {
                    // 작성해야됨
                  }
                  else {
                    Alert.alert(
                      '접속오류',
                      '접속에 실패하였습니다',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {},
                        {text: 'OK'},
                      ],
                      {cancelable: false},
                    );
  
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
  
              navigation.navigate('Main2');
            }}        
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
