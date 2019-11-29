import React, { useState, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Linking, TextInputProps, DocumentSelectionState } from 'react-native';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import { JSXElement, JSXAttribute } from '@babel/types';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components';

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
  color : #292929;
  font-size : 40px;
  font-weight : bold;
  text-align : center;
  margin-bottom : 40px;
`;


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isFocus2, setIsFocus2] = useState<boolean>(false);

  return (
    <Container>
      <FormContainer>
        <Logo>EAT NOW</Logo>
        <Input
          style={{ marginBottom: 16, borderBottomColor : isFocus? '#e94e77' : '#CCC'}}
          placeholder="이메일" 
          value = {email}
          onChangeText = {(value) => {setEmail(value)}}
          onFocus = {() => setIsFocus(true)}
          onBlur = {() => setIsFocus(false)}
        />
        <Input
          style={{ marginBottom: 25, borderBottomColor : isFocus2? '#e94e77' : '#CCC'}}
          placeholder="비밀번호"
          secureTextEntry={true}
          value = {password}
          onChangeText = {(value) => {setPassword(value)}}
          onFocus = {() => setIsFocus2(true)}
          onBlur = {() => setIsFocus2(false)}
        />
        <PasswordReset
          onPress={() => {
            Linking.openURL('https://www.naver.com');
          }}>
          이메일 / 비밀번호 찾기
        </PasswordReset>
        
        <Button
          style={{ marginBottom: 24 }}
          label="로그인"
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
              .then((responseData) => {
                  console.log(
                      "POST Response",
                      "Response Body -> " + JSON.stringify(responseData)
                  )
              })
              .catch((error) => {
                console.error(error);
              });
              AsyncStorage.setItem('key', 'JWT_KEY');
              navigation.navigate('MainNavigator');
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
    headerBackTitle : 'kjhkj',  
  }
};

export default Login;
