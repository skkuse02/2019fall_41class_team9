import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState, NavigationScreenOptionsGetter, NavigationActions, NavigationScreenComponent } from 'react-navigation';
import Styled from 'styled-components/native';
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
  background-color: #ddd;
  flex : 1;
`;
const ButtonIcon = Styled.TouchableOpacity``;

const Box = Styled.View`
  background-color: #eee;
  flex : 1;
  margin : 10px;
  margin-top : 10px;
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
        <Container >
        <Box>
          <View style={{marginTop :120}}>
              <Description style={{fontSize :30,   color : '#e94e77'}}>처음 오셨나요?</Description>
              <Description style={{color : 'black'}}>시작하기를 누르고 둘중에 선호하는 음식을 골라주세요</Description>

          </View>
          <View2 >
            <Button style ={{width : 250, height : 40, margin : 80, borderRadius : 10}}
              label="시작하기"
              onPress={() => navigation.navigate('Tutorial2')}
            />
          </View2>
        </Box>
      </Container>
    );
};


const Tutorial2 = ({ navigation }: Props) => {
    const [ranking, setRanking] = useState<Array<number>>([0,0,0,0,0,0,0,0]);
    const [food, setFood] = useState<Array<number>>([0,1,2,3,4,5,6,7]);
    const [food1, setFood1] = useState<number>(0);
    const [food2, setFood2] = useState<number>(1);

    const items = [
        {
            name: '햄버거',
            picture: require('../../Assets/Images/1.jpeg'),
        },
        {
            name: '삼겹살',
            picture: require('../../Assets/Images/2.jpeg'),
        },
        {
            name: '치킨',
            picture: require('../../Assets/Images/3.jpeg'),
        },
        {
            name: '짜장면',
            picture: require('../../Assets/Images/4.jpeg'),
        },
        {
            name: '초밥',
            picture: require('../../Assets/Images/5.jpeg'),
        },
        {
            name: '돼지국밥',
            picture: require('../../Assets/Images/6.jpeg'),
        },
        {
            name: '탕수육',
            picture: require('../../Assets/Images/7.jpeg'),
        },
        {
            name: '생선구이',
            picture: require('../../Assets/Images/8.jpeg'),
        },
    ];

    useEffect(() => {
      setFood1(food[0]);
      setFood2(food[1]);
    }, [food]);

    const getFood = (i : number) => {
      ranking[i]++;
      setRanking(ranking);
      let value : Array<number> = [...food, i];
      value.splice(0,2);

      if(value.length === 1) {
        let send : Array<number> = [];
        for(let i=0; i<8; i++)
          if(ranking[i] === 3) send.push(i);
        for(let i=0; i<8; i++)
          if(ranking[i] === 2) send.push(i);
        for(let i=0; i<8; i++)
          if(ranking[i] === 1) send.push(i);
        AsyncStorage.getItem('token')
          .then((token)=> {
            AsyncStorage.getItem('key')
              .then((key) => {
                fetch("http://218.209.210.102:7897/api/recommend/first", {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "token" : token,
                    "sn" : key,
                    "name1" : items[send[0]].name,
                    "name2" : items[send[1]].name,
                    "name3" : items[send[2]].name,
                    "name4" : items[send[3]].name,
                  })
                })
                  .then((response) => response.json())
                  .then((json) => {
                    if(json.message ==='success') {
                      navigation.navigate('MainNav');
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
          });

      }
      else
        setFood([...value]);

    };

    const renderImage1 = () => {
      return (
        <View2>
          <Image
            style={{width: 200, height: 200, borderRadius : 10}}
            source={items[food1].picture}
          />
          <View3><FoodName>{items[food1].name}</FoodName></View3>
        </View2>
      );
    };

    const renderImage2 = () => {
      return (
        <View2>
          <Image
            style={{width: 200, height: 200, borderRadius : 10}}
            source={items[food2].picture}
          />
          <View3><FoodName>{items[food2].name}</FoodName></View3>
        </View2>
      );
    };

    return (
      <Container>
        <Box>
          <Description style={{fontSize : 20}}>좋아하는 음식 하나를 선택해주세요</Description>

          <ButtonIcon onPress = {() => getFood(food1!)}>
            {renderImage1()}
          </ButtonIcon>
          <ButtonIcon onPress = {() => getFood(food2!)}>
            {renderImage2()}
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
