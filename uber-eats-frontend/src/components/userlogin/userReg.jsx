/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import history from './history';
// eslint-disable-next-line import/no-cycle
import { UserLogin } from './index';

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

export class userReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      contact: '',
      email: '',
      password: '',
      register: false,
      redirect: null,
    };
    
  }
  
  componentDidMount() {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      register: false,
    });
  }


  handleInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }



  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      contact,
      email,
      password,
    } = this.state;
    console.log(username, contact, email, password);
    Axios.post('http://localhost:3001/userReg', {
      username,
      contact,
      email,
      password,
    }).then((response) => {
      console.log('Status Code : ', response.status);
      console.log(response);
      this.setState({
        redirect: true,
      });
      
      // props.history.push('/login');
      // <Redirect to='/login'/>
    });
  }

  render() {
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <HeadText>
                Let&apos;s get started
                <br />
                <br />
              </HeadText>
            </div>
          </div>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                Enter your details(required).
                <br />
              </OverallText>
            </div>
          </div>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                <input type="text" name="username" placeholder=" Name " style={{ width: '390px', height: '35px' }} onChange={this.handleInputChange.bind(this)} required />
                <br />
              </OverallText>
            </div>
          </div>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                <input type="tel" name="contact" placeholder=" Contact Number " style={{ width: '390px', height: '35px' }} onChange={this.handleInputChange.bind(this)} required />
                <br />
              </OverallText>
            </div>
          </div>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                <input type="email" name="email" placeholder=" Email " style={{ width: '390px', height: '35px' }} onChange={this.handleInputChange.bind(this)} required />
                <br />
              </OverallText>
            </div>
          </div>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                <input type="password" name="password" placeholder=" Password " style={{ width: '390px', height: '35px' }} onChange={this.handleInputChange.bind(this)} required />
                <br />
                <br />
              </OverallText>
            </div>
          </div>
          <div className="row">
            <div className="col-xs" />
            <div className="col-xs">
              <OverallText>
                <input type="button" value="Register" style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }} onClick={this.handleSubmit} />
              </OverallText>
            </div>
          </div>
        </form>
          <div className="row">
          <div className="col-xs" />
          <div className="col-xs">
            <OverallText>
              Already have an account?
              <Router forceRefresh>
                <Link to="/login" onClick={() => history.push('/login')} style={{ color: 'green' }}> Login</Link>
                <Switch>
                  <Route exact path="/login" component={UserLogin} />
                </Switch>
              </Router>
            </OverallText>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
