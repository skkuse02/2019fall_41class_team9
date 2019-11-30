import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import Styled from 'styled-components/native';
import { StyledComponent } from 'styled-components';

const Container = Styled.View`
  width: 100%;
  height: 40px;
  padding-right: 16px;
  border-radius: 4px;
  background-color: #FFF;
  border-bottom-width: 1;
  border-bottom-color:  #CCC;
  font-size : 20px;
`;
const InputField = Styled.TextInput`
  flex: 1;
  font-size : 17px;
`;

interface Props {
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: Object;
  clearMode?: boolean;
  onChangeText?: (text: string) => void;
  value? : string;
  onSubmitEditing? : () => void;
  onFocus? : () => void;
  onBlur? : () => void;
}

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  onChangeText,
  value,
  onSubmitEditing,
  onFocus,
  onBlur,
}: Props) => {

  return (
    <Container style={style} >
        <InputField
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType ? keyboardType : 'default'}
          autoCapitalize="none"
          autoCorrect={false}
          allowFontScaling={false}
          placeholderTextColor="#CCC"
          placeholder={placeholder}
          clearButtonMode={clearMode ? 'while-editing' : 'never'}
          onChangeText={onChangeText}
          value = {value}
          onSubmitEditing =  {onSubmitEditing}
          onFocus = {onFocus}
          onBlur = {onBlur}
        />
    </Container>
  );
};

export default Input;
