import React, { useState, useEffect } from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  background-color: #e94e77;
  flex : 1;
`;

const Box = Styled.View`
  background-color: #f9cec7;
  flex : 1;
  margin : 35px;
  margin-top : 70px;
  border-radius : 40px;
`;


interface Props {}

const MainBackground = ({} :Props) => {
    

    return (
        <Container>
            <Box>

            </Box>
        </Container>
    );
};

  
export default MainBackground;