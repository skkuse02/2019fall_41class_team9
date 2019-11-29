import React, { useState, Component } from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';
import Tab from '~/Components/Tab';

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const FormContainer = Styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 32px;
`;
const Description = Styled.Text`
  text-align: center;
  font-size: 12px;
  color: #929292;
  margin: 0px 8px;
`;
const TabContainer = Styled.View`
  flex-direction: row;
  margin-bottom: 16px;
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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const SignUp = ({ navigation }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const tabs = ['이용약관', '전화번호', '이메일'];

  return (
    <Container>
      <FormContainer>
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
        <Input
          style={{ marginBottom: 16 }}
          placeholder={'이용약관'}
        />

        <Button label="다음"  onPress={() => {
          setTabIndex(tabIndex + 1);
          if(tabIndex===2) {
            navigation.navigate('SignUpDoneNavigator');
          }
        } }  style={{ marginBottom: 24 }} />
        {tabIndex === 0 && (
          <Description>
            SNS App의 업데이트 내용을 SMS로 수신할 수 있으며, 언제든지 수신을
            취소할 수 있습니다.
          </Description>
        )}
      </FormContainer>
      <Footer>
        <FooterDescription>
          이미 계정이 있으신가요?{' '}
          <GoBack onPress={() => navigation.goBack()}>로그인</GoBack>
        </FooterDescription>
      </Footer>
    </Container>
  );
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
