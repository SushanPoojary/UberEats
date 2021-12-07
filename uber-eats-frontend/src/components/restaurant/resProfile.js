/* eslint-disable no-else-return */
/* eslint-disable react/sort-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
// import { Redirect } from 'react-router';
// import cookie from 'react-cookies';
// import Axios from 'axios';
import { Image } from 'cloudinary-react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
// import { connect } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getResQuery } from '../../queries/queries';
import { resProfileMutation } from '../../mutations/mutations';
import NavBar from '../../NavBar';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
      dishes: '',
      timings: '',
      delivery: '',
      pickup: '',
      picture: '',
      preview: '',
      // uploadPublicID: '',
      authMessage: true,
      authMessageE: '',
      toastUp: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  displayItems() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      let UpdateToast = null;
      if (this.state.toastUp) {
        UpdateToast = this.notify();
      }
      const authMessageE = this.state.authMessageE;
      return (
        <div>
          <NavBar />
          {UpdateToast}
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
                    <input type="text" name="name" defaultValue={data.resDeets.name} placeholder=" Restaurant Name " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="text" name="location" defaultValue={data.resDeets.location} placeholder=" Restaurant Location " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="text" name="description" defaultValue={data.resDeets.description} placeholder=" Restaurant Description " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="tel" name="contact" defaultValue={data.resDeets.contact} placeholder=" Restaurant Contact " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="text" name="timings" defaultValue={data.resDeets.timings} placeholder=" Restaurant Timing " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="text" name="delivery" defaultValue={data.resDeets.delivery} placeholder=" Delivery " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
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
                    <input type="text" name="pickup" defaultValue={data.resDeets.pickup} placeholder=" Pickup " style={{ width: '390px', height: '35px' }} onChange={this.handleChange} required />
                    <br />
                  </OverallText>
                </div>
              </div>
              <div className="row">
                <div className="col-xs" />
                <div className="col-xs">
                  <OverallText>
                    Profile Image
                    <br />
                    <input type="file" name="picture" defaultValue={this.state.picture} onChange={this.handleFileChange} required />
                    <br />
                    {this.state.preview && (<img src={this.state.preview} alt="chosen" style={{ height: '200px' }} />)}
                    <Image
                      cloudName="sushanubereats"
                      publicID={data.resDeets.uploadPublicID}
                      width="150"
                      crop="scale"
                    />
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

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      const file = e.target.files[0];
      console.log(file);
      console.log(e.target.value);
      this.previewFile(file);
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

    notify = () => {
      toast.success('Profile Updated!');
    };

    previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ preview: reader.result });
      };
    }

    updateProfile = (data) => {
      this.props.resProfileMutation({
        variables: data,
      })
        .then((res) => {
          console.log('Frontend');
          console.log(res);
          this.setState({
            authMessage: true,
            toastUp: true,
          });
        }).catch((err) => {
          console.log(err);
          this.setState({
            authMessage: false,
          });
          this.handleValidation();
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
        dishes: this.state.dishes,
        timings: this.state.timings,
        delivery: this.state.delivery,
        pickup: this.state.pickup,
        picture: this.state.picture,
        preview: this.state.preview,
      };
      this.updateProfile(ownerData);
    }

    render() {
      return (
        <div>
          {this.displayItems()}
        </div>
      );
    }
}

export default compose(
  graphql(getResQuery),
  graphql(resProfileMutation, { name: 'resProfileMutation' }),
)(resProfile);
