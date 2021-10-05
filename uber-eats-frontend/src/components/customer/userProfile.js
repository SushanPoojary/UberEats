/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Axios from 'axios';
import styled from 'styled-components';
import { CountryDropdown } from 'react-country-region-selector';
import NavBar from '../../NavBar';

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

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      state: '',
      country: '',
      nickname: '',
      dob: '',
      about: '',
      email: '',
      contact: '',
      picture: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/userProfile')
      .then((res) => {
        if (res) {
          this.setState({ name: res.data[0].name });
          this.setState({ location: res.data[0].location });
          this.setState({ state: res.data[0].state });
          this.setState({ country: res.data[0].country });
          this.setState({ nickname: res.data[0].nickname });
          this.setState({ dob: res.data[0].dob });
          this.setState({ about: res.data[0].about });
          this.setState({ email: res.data[0].email });
          this.setState({ contact: res.data[0].contact });
          this.setState({ picture: res.data[0].picture });
        }
      }).catch((err) => {
        console.log(`User Profile: ${err}`);
      });
  }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    updateProfile = (data) => {
      Axios.post('http://localhost:3001/updateProfile', data)
        .then((res) => {
          if (res) {
            console.log('Updated');
            // this.setState({ name: data.name });
            // this.setState({ location: data.location });
            // this.setState({ description: data.description });
            // this.setState({ contact: data.contact });
            // this.setState({ picture: data.picture });
            // this.setState({ dishes: data.dishes });
            // this.setState({ timing: data.timing });
          }
        }).catch((err) => {
          console.log(`User Update Profile: ${err}`);
        });
    }

    updateUser = (e) => {
      e.preventDefault();
      const userData = {
        name: this.state.name,
        location: this.state.location,
        state: this.state.state,
        country: this.state.country,
        nickname: this.state.nickname,
        dob: this.state.dob,
        about: this.state.about,
        email: this.state.email,
        contact: this.state.contact,
        picture: this.state.picture,
      };
      this.updateProfile(userData);
    }

    selectCountry(val) {
      this.setState({ country: val });
    }

    render() {
      let redirectVar = null;
      if (!cookie.load('cookie')) {
        redirectVar = <Redirect to="/login" />;
      }
      const { country } = this.state;
      return (
        <div>
          <NavBar />
          {redirectVar}
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <HeadText>
                    User&apos;s Profile
                    <br />
                    <br />
                  </HeadText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Name
                    <br />
                    <input type="text" name="name" defaultValue={this.state.name} placeholder=" Name " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    City
                    <br />
                    <input type="text" name="location" defaultValue={this.state.location} placeholder=" City " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    State
                    <br />
                    <input type="text" name="state" defaultValue={this.state.state} placeholder=" State " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Country
                    <br />
                    <CountryDropdown value={country} defaultValue={this.state.country} placeholder=" Country " style={{ width: '390px', height: '35px' }} onChange={(val) => this.selectCountry(val)} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    NickName
                    <br />
                    <input type="text" name="nickname" defaultValue={this.state.nickname} placeholder=" NickName " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Date of Birth
                    <br />
                    <input type="date" name="dob" defaultValue={this.state.dob} placeholder=" DOB " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Email
                    <br />
                    <input type="email" name="email" defaultValue={this.state.email} placeholder=" Email " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    About
                    <br />
                    <input type="text" name="about" defaultValue={this.state.about} placeholder=" About " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Contact
                    <br />
                    <input type="tel" name="contact" defaultValue={this.state.contact} placeholder=" Contact " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <button type="submit" onClick={this.updateUser} style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }}>Update Profile</button>
            </form>
          </div>
        </div>
      );
    }
}

export default userProfile;
