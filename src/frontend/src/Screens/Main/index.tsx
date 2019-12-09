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
import {Alert, Image, FlatList, Linking} from 'react-native'
import Carousel from "pinar";
import NaverMapView, {Marker} from 'react-native-nmap';
import proj4 from 'proj4';
import Geolocation from 'react-native-geolocation-service';

const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;

const Container = Styled.View`
  background-color: #EEE;
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

const ListItemConatiner = Styled.View `
    background-color: #FFF;
    margin:4px 16px;
    padding: 8px 8px;
    border-radius: 8px;
`;

const LoadingView = Styled.View `
    flex:1;
    justify-content: center;
    align-items : center;
`;

const Loading = Styled.ActivityIndicator `
    margin-bottom : 16px;
`;

const LoadingLabel = Styled.Text `
    font-size : 16px;
`;

const ListTitle = Styled.Text `
    margin-bottom: 16px;
    font-size : 24px;
    font-weight: bold;
`;

const ListDescription = Styled.Text `

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
        <Title style={{fontSize : 30}}>오늘 먹을 음식은?</Title>
        <View>
          <Slider
            style={{margin : 100, padding : 10}} width={330}
            height={50} title={'인원을 선택해주세요'}
            min={1} max={5} value={people}  units={'명'}
            backgroundColor= {['rgb(3, 169, 244)', 'rgb(255, 87, 34)']}
            onValueChanged = {(value) => setPeople(value)}
          />
          <View3></View3>
          <Slider
            style={{margin : 100, padding : 10}} width={330}
            height={50} title={'가격대를 선택해주세요'}
            min={5} max={33} value={price}  units={'000원'}
            backgroundColor= {['rgb(3, 169, 244)', 'rgb(255, 152, 0)', 'rgb(255, 87, 34)']}
            onValueChanged = {(value) => setPrice(value)}
          />
        </View>
        <View2>
          <Button style ={{height : 40, margin : 30}}
            label="추천음식 보기"
            onPress={() => {
              console.log(people, price);
              AsyncStorage.setItem('people', JSON.stringify(people))
                .then(()=>{
                  AsyncStorage.setItem('price', JSON.stringify(price * 1000))
                    .then(()=>{
                      navigation.navigate('Main2');
                    })
                })
            }}
          />
        </View2>
      </Box>
    </Container>
  );
};

const Style1 = Styled.View `
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;
const Text1 = Styled.Text `
    color: #1f2d3d
    opacity: 0.7;
    font-size: 48;
    font-weight: bold;
`;




const Main2 = ({ navigation }: Props) => {
  const [color, setColor] = useState<string>("");
  const [foods, setFoods] = useState<Array<Food>>([]);
  const nameList = foods.map(
      (name) => ( <Style1 ><Image style={{width: 300, height: 300, resizeMode:'contain'}} source={{uri: name.picture}}/><ListDescription>{name.name}</ListDescription>
                  <Button style ={{fontSize : 40, width : 250, margin : 30, backgroundColor : 'black'}} label={"선택하기"} onPress={() => {
                    AsyncStorage.getItem('key')
                      .then((key) => {
                        fetch("http://218.209.210.102:7897/api/recommend/update", {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            "sn" : key,
                            "food" : name.name
                          })
                        })
                          .catch((error) => {
                            console.error(error);
                          });
                        AsyncStorage.setItem('food', name.name)
                          .then(() => navigation.navigate("Main3"));
                      });
}}/></Style1> ));

  useEffect( () => {
    AsyncStorage.getItem('key')
      .then((key)=>{
        AsyncStorage.getItem('people')
          .then((people)=>{
            AsyncStorage.getItem('price')
              .then((price)=>{
                fetch("http://218.209.210.102:7897/api/recommend/recomm", {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    "sn" : key,
                    "person": people,
                    "money": price,
                  })
                })
                  .then((response) => response.json())
                  .then((json) => {
                    if(json.message ==='success') {
                      let food : Array<Food> = [];
                      for(let i=0; i < json.url_image.length; i++) {
                        food.push({"name" : json.url_image[i][0], "picture" : 'http://218.209.210.102:7897/' + json.url_image[i][0] + '.jpg'});
                      }
                      setFoods([...food]);
                      console.log([...food]);
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
        });

      }, []);





  return (
    <Style1 style={{alignItems : 'flex-start'}}>
      <ButtonIcon style={{marginLeft: 10}} onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Vector
          style={{marginLeft : 10, marginTop : 10}}
          size={40}
          name='ios-menu'
          color = "gray"
        />
      </ButtonIcon>

      <Carousel showsControls={true} showsDots ={false}>
        {nameList}
      </Carousel>
    </Style1>
  );
};


interface APIInfo {
  title? : string,
  mapx? : number,
  mapy? : number ,
  link? : string,
  telephone	: string,
  roadAddress : string,
};

const Main3 = ({ navigation }: Props) => {
  const from = 'TM128';
  const to = 'WGS84';
  proj4.defs('WGS84', "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
  proj4.defs('TM128', '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43');


  const [info, setInfo] = useState<APIInfo>( {
    title : "",
    mapx : 126.98382907057905,
    mapy : 37.56308705536678,
    link : "",
    telephone : "",
    roadAddress : "",
  });

  const [data, setData] = useState<Array<APIInfo>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [center, setCenter] = useState<any>({latitude : 37.444918, longitude : 127.13886839});

  const getInfo = () => {
    setIsLoading(false);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        setCenter({latitude : latitude, longitude : longitude});
        AsyncStorage.getItem('food')
          .then((value) => {
            fetch("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=" + longitude + ","+ latitude + "&sourcecrs=epsg:4326&output=json&orders=addr,admcode", {
              method: 'GET',
              headers: {
                'X-NCP-APIGW-API-KEY-ID' : 'kryvy5er65',
                'X-NCP-APIGW-API-KEY' : 'ThL5wxstVdlYYNKuldVFac3ttwZ19PlKfOdy5lSu',
              },
            })
              .then((response) => response.json())
              .then((json) => {
                let v = json.results[0].region.area3.name + ' ' + value;
                fetch("https://openapi.naver.com/v1/search/local.json?query="+ v +"&display=10&start=1&sort=random", {
                  method: 'GET',
                  headers: {
                    'Host': 'openapi.naver.com',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Naver-Client-Id' : 'hKQtx4sXxdvt_VEEnu8T',
                    'X-Naver-Client-Secret' : 'DVSpEOSABy',
                  },
                })
                  .then((response) => response.json())
                  .then((json) => {
                    let datas = Array<APIInfo>();
                    for(let i=0; i<json.items.length; i++) {
                        datas.push({title : json.items[i].title, mapx : json.items[i].mapx, mapy : json.items[i].mapy,
                          link : json.items[i].link, telephone : json.items[i].telephone, roadAddress : json.items[i].roadAddress
                        });
                    }
                    setData(datas);
                    setIsLoading(true);
                  })
                  .catch((error) => {
                    setIsLoading(true);
                    console.log('검색 정보를 가져오는데 실패하였다.');
                  });

              })
              .catch((error) => {
                setIsLoading(true);
                console.log(error);
              });

          });

      },
      error => {

      }
    );
  }

  useEffect( () => {
    getInfo();
  }, []);


  return (
    <Container style={{backgroundColor : '#EEE'}}>
        <NaverMapView style={{flex:0.8}} showsMyLocationButton={true} center={center}>
          <Marker coordinate= {center}></Marker>

        </NaverMapView>
        <FlatList
          style={{flex : 2}}
          onRefresh = {() => getInfo()}
          refreshing = {!isLoading}
          data={data}
          keyExtractor = {(item, index)=> {
              return `List-${index}`;
          }}
          ListEmptyComponent = {
              <LoadingView>
                  <Loading size="large" color="#1976D2" />
                  <LoadingLabel>Loading...</LoadingLabel>
              </LoadingView>
          }
          renderItem = {({item, index}) => (
              <ListItemConatiner>
                <ButtonIcon
                  onLongPress = {()=>{item.link?
                    Alert.alert(
                      '사이트에 접속하시겠습니까?',
                      '',
                      [{},{},{text: '수락', onPress: () => Linking.openURL(item.link!),}],
                      {cancelable: true},
                    ) : "";
                  }}
                  onPress = {() => {
                    var xy = [Number(item.mapx), Number(item.mapy)];
                    var result = proj4(from, to, xy);
                    setCenter({latitude : result[1], longitude : result[0]})
                  }}>
                <ListTitle>{item.title.replace(/(<([^>]+)>)/ig,"")}</ListTitle>
                <ListDescription>{item.telephone?'전화번호 : ' + item.telephone:""}</ListDescription>
                <ListDescription>{item.roadAddress? '주소 : ' + item.roadAddress:""}</ListDescription>
                <ListDescription>{item.link? '홈페이지 : ' + item.link:""}</ListDescription>
                </ButtonIcon>

              </ListItemConatiner>
          )}
          contentContainerStyle= {data.length=== 0 && {flex : 1}}
          />
    </Container>
  );
};



Main.navigationOptions = {
  header : null,
}

Main2.navigationOptions = {
  header : null,
};

Main3.navigationOptions = {
  header : null,
};

export {Main, Main2, Main3};
