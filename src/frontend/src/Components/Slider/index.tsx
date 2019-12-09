import MotionSlider from 'react-native-motion-slider';
import React, { useEffect, useState } from 'react';


interface Props {
    style?: Object;
    title : string;
    units : string;
    max : number;
    min : number;
    value : number;
    width : number;
    height : number;
    backgroundColor :Array<string>;
    onPressOut : (value : number)=>void;
    onValueChanged : (value :number) => void;
  }

const Slider = ({style, title, units, max, min, value, width, height, backgroundColor, onValueChanged, onPressOut} :Props) => {
    return(
      <MotionSlider
        style={style}
        width={width}
        height={height}
        borderRadius={20}
        titleColor='#e94e77'
        titleStyle={{}}
        minColor='white'
        maxColor='white'
        valueColor='white'
        fontSize={10}
        valueBackgroundColor='white'
        fontWeight='bold'
        fontFamily=''
        title={title}
        min={min}
        max={max}
        value={value}
        decimalPlaces={0}
        units={units}
        backgroundColor={backgroundColor}
        onValueChanged={onValueChanged}
        onPressIn={() =>{}}
        onPressOut={onPressOut}
        onDrag={(value : number) => {}}
      />
    );
};


export default Slider;
