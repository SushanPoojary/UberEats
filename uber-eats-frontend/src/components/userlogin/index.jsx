import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    width: 280px;
    min-height; 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #FFF;
    box-shadow: 0 0 3px rgba(15, 15, 0.25);
    position: relative;
    overflow: hidden;
`;

const Top = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const Back = styled.div`
    width; 150%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
`;

export function UserLogin() {
  return (
    <Box>
      <Top>
        <Back />
      </Top>
    </Box>
  );
}
