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

interface Props {
  label: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
  disabled? : boolean;
}

const Button = ({ label, style, color, onPress, disabled }: Props) => {
  return (
    <StyleButton style={style} onPress={onPress} disabled={disabled}>
      <Label style={{ color: color ? color : '#FFFFFF' }}>{label}</Label>
    </StyleButton>
  );
};

export default Button;
