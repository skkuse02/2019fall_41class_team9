import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
  height: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  border-color: #e94e77;
  background-color : #e94e77;
`;
const Label = Styled.Text`
  color: #FFFFFF;
`;
const Container = Styled.TouchableOpacity `
  flex-direction : row;
`;
const Icon = Styled.Image `
  justify-content : center;
  align-items : center;
  margin-left : 15px;
  margin-right : 15px;
`;


interface Props {
  label: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
  disabled? : boolean;
  fontSize? :number | undefined;
}

const Button = ({ label, style, color, onPress, disabled, fontSize, }: Props) => {
  return (
    <StyleButton style={style} onPress={onPress} disabled={disabled}>
      <Label style={{ fontSize: fontSize,  color: color ? color : '#FFFFFF' }}>{label}</Label>
    </StyleButton>
  );
};

interface IconProps {
  iconName : string;
  onPress? : () => void;
  style?: Object;
}


const ButtonIcon = ({iconName, onPress, style} : IconProps) => {
  return(
      <Container onPress = {onPress} style={style}>
          <Icon
              source = {require('~/Assets/Images/next.png')}
          />
      </Container>
  );
};


interface SetProps {
  label : string;
  iconName : string;
  onPress? : () => void;
  style?: Object;
}

const ButtonSet = ({label, iconName, onPress, style} : SetProps) => {
  return(
      <Container onPress = {onPress} style={style}>
          <Label style={{fontSize : 40}}>
              {label}
          </Label>
          <Icon
              source = {require('~/Assets/Images/next.png')}
              resizeMode = "contain"
          />
      </Container>
  );
};

const ButtonSet2 = ({label, iconName, onPress, style} : SetProps) => {
  return(
      <Container onPress = {onPress} style={style}>
          <Icon 
              source = {require('~/Assets/Images/previous.png')}
          />

          <Label style={{fontSize : 20}}>
              {label}
          </Label>
      </Container>
  );
};


export {Button, ButtonIcon, ButtonSet, ButtonSet2};
