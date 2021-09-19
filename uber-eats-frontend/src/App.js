import React from 'react';
// import styled from 'styled-components';
import logo from './uber-eats.svg';
import './App.css';
import { UserLogin } from './components/userlogin';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <body>
      <div className="container">
        <div className="container-fluid text-center">
          <h3 className="margin">
            <img src={logo} alt="UEL" width={200} height={35} />
          </h3>
          <br />
          <br />
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="col-sm-8">
          <UserLogin />
        </div>
      </div>
    </body>
  );
}

export default App;
