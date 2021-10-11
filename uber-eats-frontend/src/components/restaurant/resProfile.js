/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import Axios from 'axios';
import styled from 'styled-components';
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

class resProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      description: '',
      contact: '',
      picture: '',
      dishes: '',
      timing: '',
      delivery: '',
      pickup: '',
      authMessage: true,
      authMessageE: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Axios.defaults.withCredentials = true;
    Axios.get('http://54.215.127.115:3001/resProfile')
      .then((res) => {
        if (res) {
          this.setState({ name: res.data[0].name });
          this.setState({ location: res.data[0].location });
          this.setState({ description: res.data[0].description });
          this.setState({ contact: res.data[0].contact });
          this.setState({ picture: res.data[0].picture });
          this.setState({ dishes: res.data[0].dishes });
          this.setState({ timing: res.data[0].timings });
          this.setState({ delivery: res.data[0].delivery });
          this.setState({ pickup: res.data[0].pickup });
        }
      }).catch((err) => {
        console.log(`Restaurant Profile: ${err}`);
      });
  }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleValidation() {
      // console.log('validation');
      const {
        authMessage,
      } = this.state;
      const authMessageE = authMessage ? 'Profile Updated' : 'Error Updating Profile';
      this.setState({
        authMessageE,
      });
    }

    updateProfile = (data) => {
      Axios.post('http://54.215.127.115:3001/resupdateProfile', data)
        .then((res) => {
          if (res) {
            console.log('Updated');
            this.setState({
              authMessage: true,
            });
            // this.setState({ name: data.name });
            // this.setState({ location: data.location });
            // this.setState({ description: data.description });
            // this.setState({ contact: data.contact });
            // this.setState({ picture: data.picture });
            // this.setState({ dishes: data.dishes });
            // this.setState({ timing: data.timing });
          }
        }).catch((err) => {
          console.log(`Restaurant Update Profile: ${err}`);
          this.setState({
            authMessage: false,
          });
        });
      this.handleValidation();
    }

    updateRes = (e) => {
      e.preventDefault();
      const ownerData = {
        name: this.state.name,
        location: this.state.location,
        description: this.state.description,
        contact: this.state.contact,
        picture: this.state.picture,
        dishes: this.state.dishes,
        timing: this.state.timing,
        delivery: this.state.delivery,
        pickup: this.state.pickup,
      };
      this.updateProfile(ownerData);
    }

    render() {
      let redirectVar = null;
      if (!cookie.load('cookie')) {
        redirectVar = <Redirect to="/reslogin" />;
      }
      const authMessageE = this.state.authMessageE;
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
                    Restaurant&apos;s Profile
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
                    <input type="text" name="name" defaultValue={this.state.name} placeholder=" Restaurant Name " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Location
                    <br />
                    <input type="text" name="location" defaultValue={this.state.location} placeholder=" Restaurant Location " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Description
                    <br />
                    <input type="text" name="description" defaultValue={this.state.description} placeholder=" Restaurant Description " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="tel" name="contact" defaultValue={this.state.contact} placeholder=" Restaurant Contact " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Timings
                    <br />
                    <input type="text" name="timing" defaultValue={this.state.timing} placeholder=" Restaurant Timing " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Delivery
                    <br />
                    <input type="text" name="delivery" defaultValue={this.state.delivery} placeholder=" Delivery " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Pickup
                    <br />
                    <input type="text" name="pickup" defaultValue={this.state.pickup} placeholder=" Pickup " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                    <span style={{ color: 'green' }}>
                      {authMessageE}
                    </span>
                  </OverallText>
                </div>
              </div>
              <button type="submit" onClick={this.updateRes} style={{ width: '390px', height: '35px', backgroundColor: '#7bb420' }}>Update Profile</button>
            </form>
          </div>
        </div>
      );
    }
}

export default resProfile;
