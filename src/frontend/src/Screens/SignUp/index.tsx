import React, { useState, useEffect, Component } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import {CheckBox, Alert} from 'react-native';
import Styled from 'styled-components/native';
import {Button, ButtonSet, ButtonSet2} from '~/Components/Button';
import Input from '~/Components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmail, isPassword, isMatchPassword} from '~/Components/Auth';
import AsyncStorage from '@react-native-community/async-storage';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const FormContainer = Styled.View`
  width: 100%;
  padding: 20px;
`;

const Title = Styled.Text `
  font-weight : bold;
  font-size : 24px;
  margin: 20px;
  margin-top : 120px;
  margin-bottom : 40px;
`;

const Box = Styled.View`
  flex-direction : row;
  margin-left : 20px;
  margin-right : 20px;
  margin-top : 10px;
  justify-content : center;
  align-items : center;
`;

const Description = Styled.Text`
  font-size: 14px;
  color: #929292;
  margin: 0px 8px;
  justify-content : center;
  flex : 4;
`;
const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: #D3D3D3;
  padding: 8px;
`;
const FooterDescription = Styled.Text`
  color: #929292;
  text-align: center;
`;
const GoBack = Styled.Text`
  color: #3796EF;
`;

const Read = Styled.Text`
  color: #3796EF;
`;
const View = Styled.View ``;

const Notification = Styled.Text `
  color : #e94e77;
  font-size : 14px;
  margin-bottom : 20px;
`;

const Icon = Styled.Image ``;

const Touchable = Styled.TouchableOpacity ``;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}


const SignUp = ({ navigation }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isChecked, setCheck] = useState<boolean>(false);
  const [isChecked2, setCheck2] = useState<boolean>(false);
  const [isAllChecked, setAllCheck] = useState<boolean>(false);

  useEffect(() => {
    if(isChecked === true && isChecked2 === true) {
      setAllCheck(true);
    }
    else
      setAllCheck(false);
  }, [isChecked, isChecked2]);

  return (
    <Container>
      <Title style= {{marginBottom:0}}>회원가입</Title>
      <Title style= {{marginTop:0}}>약관 동의가 필요합니다.</Title>
      <Box style={{borderBottomColor : '#CCC', borderBottomWidth : 1, paddingBottom:15}}>
        <CheckBox value= {isAllChecked} onChange = {() => {
          setAllCheck(!isAllChecked)
          if(isAllChecked === false) {
            setCheck(true);
            setCheck2(true);
          }
          else {
            setCheck(false);
            setCheck2(false);
          }
        }} />
        <Description style={{fontSize : 18}} onPress = {() => {
          setAllCheck(!isAllChecked)
          if(isAllChecked === false) {
            setCheck(true);
            setCheck2(true);
          }
          else {
            setCheck(false);
            setCheck2(false);
          }
        }}>
          이용약관 등 모두 동의하기
        </Description>
      </Box>

      <Box>
        <CheckBox value= {isChecked} onChange = {() => setCheck(!isChecked)} />
        <Description onPress = {() => setCheck(!isChecked)}>
          이용약관
        </Description>
        <Touchable onPress = {()=>
          Alert.alert(
            '이용약관',
            '본 어플리케이션은 유저의 음식 선호도를 바탕으로 적절한 음식을 추천해주는 시스템입니다.',
            [
              {
                text: 'Cancel',
                  style: 'cancel',
              },
              {},
              {text: 'OK'},
            ],
            {cancelable: false},
          )}
        ><Read>보기</Read></Touchable>
      </Box>
      <Box>
        <CheckBox value= {isChecked2} onChange = {() => setCheck2(!isChecked2)} />
        <Description onPress = {() => setCheck2(!isChecked2)}>
          개인정보 수집 및 이용
        </Description>
        <Touchable onPress = {()=>
          Alert.alert(
            '개인정보 수집 및 이용 동의서',
            '이용자가 제공한 모든 정보는 음식 추천, 유저 관리 의외에는 사용되지 않습니다. 수집항목 : 이메일, 비밀번호',
            [
              {
                text: 'Cancel',
                  style: 'cancel',
              },
              {},
              {text: 'OK'},
            ],
            {cancelable: false},
          )}
        ><Read>보기</Read></Touchable>
      </Box>

        <Button label="다음"
          disabled = {!isAllChecked}
          onPress={() => navigation.navigate('SignUp2')}
          style={isAllChecked? { marginBottom: 24, marginTop: 50, marginLeft : 24, marginRight : 24} : { marginBottom: 24, marginTop: 50, marginLeft : 24, marginRight : 24, backgroundColor : "silver"}} />
      <Footer>
        <FooterDescription>
          이미 계정이 있으신가요?{' '}
          <GoBack onPress={() => navigation.goBack()}>로그인</GoBack>
        </FooterDescription>
      </Footer>
    </Container>
  );
};

SignUp.navigationOptions = {
  title : 'EAT NOW',
  headerTintColor : '#e94e77',
  headerTransparent : true,
  headerTitleStyle : {
    fontWeight : 'bold',
    textAlign : 'center',
    flex : 1,
  },
  headerRight : (<View />),

};

const SignUp2 = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [emailNoti, setEmailNoti] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordNoti, setPasswordNoti] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [password2Noti, setPassword2Noti] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isFocus2, setIsFocus2] = useState<boolean>(false);
  const [isFocus3, setIsFocus3] = useState<boolean>(false);
  const [activation, setActivation] = useState<boolean>(false);

  useEffect(() => {
    if(isEmail(email) && isPassword(password) && isMatchPassword(password, password2))
      setActivation(true);
    else
      setActivation(false);
  }, [email, password, password2]);

  return (
    <KeyboardAwareScrollView>
      <Container>
        <FormContainer>
          <Title style={{marginTop : 70, marginLeft : 0}}>회원 정보 입력</Title>
          <Read style={{color : "silver"}} >이메일</Read>
          <Input
            style={{marginBottom: 5, borderBottomColor : isFocus? '#e94e77' : '#CCC'}}
            value = {email}
            onChangeText = {(value) => {setEmail(value)}}
            onFocus = {() => setIsFocus(true)}
            onBlur = {() => {
              if(!isEmail(email)) {
                setEmailNoti("⤷입력이 올바르지 않습니다.");
              }
              else {
                setEmailNoti("");
                setIsFocus(false);
              }
            }}
            />
          <Notification>{emailNoti}</Notification>

          <Read style={{color : "silver"}} >비밀번호</Read>
          <Input
            style={{ marginBottom: 5, borderBottomColor : isFocus2? '#e94e77' : '#CCC'}}
            value = {password}
            secureTextEntry={true}
            onChangeText = {(value) => {setPassword(value)}}
            onFocus = {() => setIsFocus2(true)}
            onBlur = {() => {
              if(!isPassword(password)) {
                setPasswordNoti("⤷비밀번호는 6자리 이상 16자리 이하입니다.")
              }
              else {
                setPasswordNoti("");
                setIsFocus2(false);
              }
            }}
            />
          <Notification>{passwordNoti}</Notification>
          <Read style={{color : "silver"}} >비밀번호 확인</Read>
          <Input
            style={{ marginBottom: 5, borderBottomColor : isFocus3? '#e94e77' : '#CCC'}}
            secureTextEntry={true}
            value = {password2}
            onChangeText = {(value) => {setPassword2(value)}}
            onFocus = {() => setIsFocus3(true)}
            onBlur = {() => {
              if(!isMatchPassword(password, password2)) {
                setPassword2Noti("⤷비밀번호가 일치하지 않습니다.")
              }
              else {
                setPassword2Noti("");
                setIsFocus3(false);
              }
            }}
          />

          <Notification>{password2Noti}</Notification>
        </FormContainer>
      </Container>
      <Button label="다음"
          disabled = {!activation}
          onPress={() => {
            fetch("http://218.209.210.102:7897/api/usr/signup", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "userid": email,
                "userpw": password,
              })
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                if(json.message ==='success') {
                  AsyncStorage.setItem('email', email);
                  AsyncStorage.setItem('key', JSON.stringify(json.sn));
                  AsyncStorage.setItem('token', json.token);
                  navigation.navigate('SignUpDone');
                }
                else {

                }
              })
              .catch((error) => {
                console.error(error);
              });

          }}
          style={activation? { marginBottom: 24, marginTop: 0, marginLeft : 24, marginRight : 24} : { marginBottom: 24, marginTop: 0, marginLeft : 24, marginRight : 24, backgroundColor:"silver"}} />
    </KeyboardAwareScrollView>
  );
};

SignUp2.navigationOptions = {
  title : 'EAT NOW',
  headerTintColor : '#e94e77',
  headerTransparent : true,
  headerTitleStyle : {
    fontWeight : 'bold',
    textAlign : 'center',
    flex : 1,
  },
  headerRight : (<View />),

};


const SignUpDone = ({ navigation }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabs = ['1', '2', '3'];

  return (
    <Container style={{backgroundColor : '#e94e77'}}>
      <Title style= {{color : 'white', fontSize : 40}}>
        회원가입을 환영합니다
      </Title>


      <Box style={{marginTop : 200}}>
        <View style={{flex : 1}}></View>
        <ButtonSet
          label={"시작하기"}
          onPress={() => navigation.navigate('TutorialNavigator')}
          style={{ marginBottom: 24}}
          iconName='next'
        />
      </Box>
    </Container>
  );
};

SignUpDone.navigationOptions = {
  header : null,
};



export {SignUp, SignUp2, SignUpDone};
