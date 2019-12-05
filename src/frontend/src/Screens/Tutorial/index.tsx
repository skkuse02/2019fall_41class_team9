import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState, NavigationScreenOptionsGetter, NavigationActions, NavigationScreenComponent } from 'react-navigation';
import Styled from 'styled-components/native';
import MainBackground from '~/Components/MainBackground';
import {Button} from '~/Components/Button';
import { DrawerActions } from 'react-navigation-drawer';
import Vector from 'react-native-vector-icons/Ionicons';
import {Alert, Image} from 'react-native';

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}
  
const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;

const Container = Styled.View`
  background-color: white;
  flex : 1;
`;
const ButtonIcon = Styled.TouchableOpacity``;

const Box = Styled.View`
  background-color: #fafafa;
  flex : 1;
  margin : 10px;
  margin-top : 0px;
  border-radius : 40px;
  align-items : center;

`;

const View = Styled.View `
  flex:1;
`;
const View2 = Styled.View `
  margin : 10px;
`;


const View3 = Styled.View `
  position: absolute;
  top: 0;
  left: 0;
  right: -130;
  bottom: -170;
  justify-content: center;
  align-items: center;
`;

const FoodName = Styled.Text `
  text-align : center;
  border : 1px solid #ddd;
  background-color : white;
  border-radius : 4px;
  padding : 4px;
`;

const Description = Styled.Text `
  margin : 30px;
  font-size : 24px;
`;
const Tutorial = ({ navigation }: Props) => {
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
          <View>
              <Description style={{fontSize :30,   color : '#e94e77'}}>처음 오셨나요?</Description>
              <Description>시작하기를 누르고 둘중에 선호하는 음식을 골라주세요</Description>

          </View>
          <View2 >
            <Button style ={{ width : 250, height : 40, margin : 30}}
              label="시작하기"
              onPress={() => navigation.navigate('Tutorial2')}        
            />
          </View2>
        </Box>
      </Container>  

    );
};


const Tutorial2 = ({ navigation }: Props) => {

    const [food, setFood] = useState<Array<Food>>();
    const [food1, setFood1] = useState<Food>();
    const [food2, setFood2] = useState<Food>();
    let arr : Array<Food>
    const getFoods = () => {
      let ff : Food;
      AsyncStorage.getItem('key')
      .then(value => {
        fetch("https://www.aaadfsv.ccsg", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: value,
          })
        })
          .then((response) => response.json())
          .then((json) => {
            if(json.login ==='ok') {
              setFood([...json.food])
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
      });
    }

    const getFood = () => {
      setFood1(food![0]);
      setFood2(food![1]);
      food.splice(0, 2);
      setFood(food);
    }

    /*
    useEffect(()=> {
      getFoods();
    }, []);
    */
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
        <Description style={{fontSize : 20}}>좋아하는 음식 하나를 선택해주세요</Description>

        <ButtonIcon onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View2>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
              />
            </View2>
            <View3><FoodName>닭발</FoodName></View3>
        </ButtonIcon>
        <ButtonIcon onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View2>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
              />
              <View3><FoodName>양념치킨</FoodName></View3>
            </View2>
        </ButtonIcon>
      </Box>
    </Container>  

  );
};

Tutorial.navigationOptions = ({navigation} : Props) => {
  return {
    header : null,
  };
};

Tutorial2.navigationOptions = ({navigation} : Props) => {
  return {
    header : null,
  };
};

export {Tutorial, Tutorial2};
