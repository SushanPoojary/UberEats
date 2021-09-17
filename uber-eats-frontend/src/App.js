import React from 'react';
// import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import { UserLogin } from './components/userlogin';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <LoginContainer>
      <UserLogin />
    </LoginContainer>
  );
}

export default App;
