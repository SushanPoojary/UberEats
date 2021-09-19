import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';

// const Box = styled.div`
//     width: 500px;
//     min-height: 550px;
//     // display: flex;
//     // flex-direction: column;
//     // border-radius: 19px;
//     // background-color: #FFF;
//     // box-shadow: 0 0 3px rgba(15, 15, 0.25);
//     // position: relative;
//     // overflow: hidden;
// `;

// const Top = styled.div`
//     width: 100%;
//     height: 200px;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     // padding: 0 1.2em;
//     // padding-bottom: 5em;
// `;

// const Back = styled.div`
//     // width; 150%;
//     // height: 550px;
//     // position: absolute;
//     // display: flex;
//     // flex-direction: column;
//     // border-radius: 50%;
// `;

const HeadText = styled.h2`
    font-size: 30px;
    font-weight: 500;
    line-height: 1.24;
    color: ##000000;
    float: left;
    // z-index: 0;
    // margin: 0;
    //padding-left: 150px;
`;
const OverallText = styled.h2`
    font-size: 18px;
    font-weight: 300;
    line-height: 1.00;
    color: ##000000;
    float: left;
    // z-index: 0;
    // margin: 0;
    //padding-left: 150px;
`;

export function UserLogin() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md" />
        <div className="col-md">
          <HeadText>
            Welcome back
            <br />
            <br />
          </HeadText>
        </div>
      </div>
      <div className="row">
        <div className="col-md" />
        <div className="col-md">
          <OverallText>
            Sign in with your email address or mobile number.
            <br />
          </OverallText>
        </div>
      </div>
      <div className="row">
        <div className="col-md" />
        <div className="col-md">
          <OverallText>
            <form>
              <input type="tel/email" name="login" placeholder=" Email or mobile number" style={{ width: '390px', height: '35px' }} />
              <br />
              <br />
            </form>
          </OverallText>
        </div>
      </div>
      <div className="row">
        <div className="col-md" />
        <div className="col-md">
          <OverallText>
            <form>
              <input type="submit" value="Next" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} />
            </form>
          </OverallText>
        </div>
      </div>
    </div>
  );
}
