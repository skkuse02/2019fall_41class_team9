import React, { useState, useEffect, Component } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import {CheckBox} from 'react-native';
import Styled from 'styled-components/native';

import Button from '~/Components/Button';
import Tab from '~/Components/Tab';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const Title = Styled.Text `
  font-weight : bold;
  font-size : 24px;
  margin: 20px;
  margin-top : 100px;
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
        <Read>보기</Read>
      </Box>
      <Box>
        <CheckBox value= {isChecked2} onChange = {() => setCheck2(!isChecked2)} />
        <Description onPress = {() => setCheck2(!isChecked2)}>
          개인정보 수집 및 이용
        </Description>
        <Read>보기</Read>
      </Box>  

        <Button label="다음"
          onPress={() => {}}  
          style={{ marginBottom: 24, marginTop: 50, marginLeft : 24, marginRight : 24}} />
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


const SignUpDone = ({ navigation }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabs = ['1', '2', '3'];

  return (
    <Container>
      <TabContainer>
        {tabs.map((label: string, index: number) => (
          <Tab
            key={`tab-${index}`}
            selected={tabIndex === index}
            label={label}
            onPress={() => setTabIndex(index)}
          />
        ))}
      </TabContainer>

      <Description>
        회원가입을 환영합니다
      </Description>

      <Button 
        label="시작하기"
        onPress={() => navigation.navigate('CheckLogin')} 
        color={"black"}
        style={{ marginBottom: 24 }}
      />

    </Container>
  );
};


export {SignUp, SignUpDone};
