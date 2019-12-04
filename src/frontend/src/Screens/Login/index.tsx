import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Linking, TextInputProps, DocumentSelectionState, Alert } from 'react-native';
import Styled from 'styled-components/native';
import Input from '~/Components/Input';
import {Button} from '~/Components/Button';
import { JSXElement, JSXAttribute } from '@babel/types';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components';
import {isEmail, isPassword} from '~/Components/Auth';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
`;
const FormContainer = Styled.View`
  width: 100%;
  padding: 40px;
`;

const Notification = Styled.Text `
  color : #e94e77;
  font-size : 14px;
  margin-bottom : 20px;
`;

const PasswordReset = Styled.Text`
  width: 100%;
  font-size: 12px;
  color: #e94e77;
  text-align: center;
  margin-bottom: 40px;
`;

const SignupText = Styled.Text`
  color: #929292;
  text-align: center;
  margin-bottom : 60px;
`;

const SignupLink = Styled.Text `
  color : #3796EF;
`;

const Logo = Styled.Text `
  color : #e94e77;
  font-size : 40px;
  font-weight : bold;
  text-align : center;
  margin-bottom : 60px;
`;


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [emailNoti, setEmailNoti] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordNoti, setPasswordNoti] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isFocus2, setIsFocus2] = useState<boolean>(false);
  const [activation, setActivation] = useState<boolean>(false);

  useEffect(() => {
    if(isEmail(email) && isPassword(password))
      setActivation(true);
    else
      setActivation(false);
  }, [email, password]);

  return (
    <Container>
      <FormContainer>
        <Logo>EAT NOW</Logo>
        <Input
          style={{ marginBottom: 5, borderBottomColor : isFocus? '#e94e77' : '#CCC'}}
          placeholder="이메일"
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
        <Input
          style={{ marginBottom: 5, borderBottomColor : isFocus2? '#e94e77' : '#CCC'}}
          placeholder="비밀번호"
          secureTextEntry={true}
          value = {password}
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

        <PasswordReset
          onPress={() => {
            Linking.openURL('https://www.naver.com');
          }}>
          이메일 / 비밀번호 찾기
        </PasswordReset>

        <Button
          style={activation? { marginBottom: 24 } : {marginBottom : 24, backgroundColor : 'silver'}}
          label="로그인"
          disabled={!activation}
          onPress={() => {
            console.log(email);
            console.log(password);
            fetch("https://www.naver.com", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password,
              })
            })
              .then((response) => response.json())
              .then((json) => {
                if(json.login ==='ok') {
                  AsyncStorage.setItem('key', json.key);
                  AsyncStorage.setItem('tutorial', json.tutorial);
                  navigation.navigate('CheckLogin');
                }
                else {
                  Alert.alert(
                    'Alert Title',
                    'My Alert Msg',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />

        <SignupText>
          혹시 처음이신가요? {' '}
          <SignupLink onPress = { () => navigation.navigate('SignUp')}>
            회원가입.
          </SignupLink>
        </SignupText>

      </FormContainer>
    </Container>
  );
};

Login.navigationOptions = ({navigation} : Props) => {
  return {
    headerTransparent : true,
    headerTintColor : '#E70915',
    headerTitleStyle : {
      fontWeight : 'bold',
    },
  };
};

export default Login;
