/* eslint-disable react/destructuring-assignment */
/* eslint-disable */
import React, { Component } from 'react';
import { MDBCol, MDBIcon } from 'mdbreact';
import Axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from '../../NavBar';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

class homePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      redirectSearch: false,
      viewFilter: false,
      resultTable: [],
      filteredCuisines: [],
      remail: '',
      redirectVar: false,
    };
    console.log(this.state.redirectVar);
    console.log(this.state.remail);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFilterPage = this.showFilterPage.bind(this);
  }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    sendRestAPI = (data) => {
      Axios.defaults.withCredentials = true;
      Axios.post('http://localhost:3001/searchItem', data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ resultTable: res.data });
            // this.setState({ redirectSearch: true })
          } else {
            this.setState({ redirectSearch: false });
          }
        });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.sendRestAPI({ item: this.state.item });
    }

    handleVisit = (event) => {
        event.preventDefault();
        const visitdata = {
          email: event.target.value,
        };
        console.log(visitdata);
        this.setState({
            remail: visitdata,
            redirectVar: true,
        })
        console.log(this.state.remail);
        console.log(this.state.redirectVar);
        Axios.defaults.withCredentials = true;
        Axios.post('http://localhost:3001/sr', visitdata)
            .then((res) => {
                console.log(res.status);
            });
    }

    handleFavourite = (event) => {
      event.preventDefault();
      const visitdata = {
        email: event.target.id,
      };
      console.log(visitdata);
      this.setState({
          remail: visitdata,
      })
      console.log(this.state.remail);
      Axios.defaults.withCredentials = true;
      Axios.post('http://localhost:3001/markfavourite', visitdata)
          .then((res) => {
              console.log(res.status);
          });
  }

    showFilterPage = (e) => {
      this.setState({ viewFilter: true });
      Axios.defaults.withCredentials = true;
      Axios.post('http://localhost:3001/filter')
        .then((res) => {
          if (res.status === 200) {
            this.setState({ filteredCuisines: res.data });
          } else {
            this.setState({ redirectSearch: false });
          }
        });
    }

    render() {
      if (this.state.redirectSearch) {
        return <Redirect to="/homepage/search" />;
      }

      let filterPage = null;
      if (this.state.viewFilter) {
        filterPage = <div>
            <table>
                Veg Items Available from:
                <tbody>
                    {this.state.filteredCuisines.map((item, i) =>
                        <tr id={i+1}>
                            <td style={{ textAlign: 'left' }}>{item.name}</td>
                            <td><input type="button" value={item.email} style={{ width: '170px', height: '30px', backgroundColor: '#7bb420', textAlign: 'left' }} onClick={this.handleVisit} /> </td>
                            <td><input type="button" id={item.email} value="MarkFavourite" style={{ width: '120px', height: '30px', backgroundColor: '#fff26d', textAlign: 'left' }} onClick={this.handleFavourite} /> </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
      }
      let redirectHome = null;
      let redirectVar = null;
      if (cookie.load('cookie')) {
          console.log("here");
        redirectHome = <Redirect to="/homepage" />
      }
      if (this.state.redirectVar){
          console.log("here");
          redirectVar = <Redirect to="/seerestaurant" />
      }
      let showRestaurants = null;
      if (this.state.resultTable.length > 0) {
        showRestaurants = (
                <div>
                    <table>
                     <thead>
                         <tr>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>SID</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Name</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Description</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Timings</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Contact</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Visit</td>
                          <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Mark Favourite</td>
                          </tr>
                       </thead>
                        <tbody>
                            {this.state.resultTable.map((item, i) =>
                                <tr>
                                  <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                                  <td style={{ textAlign: 'left' }}> {item.name}</td>
                                  <td style={{ textAlign: 'left' }}> {item.description}</td>
                                  <td style={{ textAlign: 'left' }}> {item.location}</td>
                                  <td style={{ textAlign: 'left' }}> {item.timings}</td>
                                  <td style={{ textAlign: 'left' }}> {item.contact}</td>
                                <td><input type="button" value={item.email} style={{ width: '170px', height: '30px', backgroundColor: '#7bb420', textAlign: 'left' }} onClick={this.handleVisit} /> </td>
                                <td><input type="button" id={item.email} value="Mark Favourite" style={{ width: '120px', height: '30px', backgroundColor: '#fff26d', textAlign: 'left' }} onClick={this.handleFavourite} /> </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        )
      }
      return (
            <div>
                {redirectHome}
                {redirectVar}
                <NavBar />
                <h2>User Homepage</h2>
                <MDBCol md="6">
                    <form className="form-inline mt-4 mb-4" onSubmit={this.handleSubmit}>
                    <MDBIcon icon="search" /> 
                    <input className="form-control form-control-sm ml-3 w-100" type="text" placeholder="Search Dish Name, Restaurants, Cuisine, Locations" aria-label="Search"
                            name="item" value={this.state.item} onChange={this.handleChange} required />
                    </form>
                </MDBCol>
                {showRestaurants}
                <button onClick={this.showFilterPage}>Veg Restaurants</button>
                {filterPage}
            </div>
      );
    }
}

export default homePage;
