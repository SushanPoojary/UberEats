/* eslint-disable prefer-destructuring */
/* eslint-disable react/sort-comp */
/* eslint-disable dot-notation */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import Axios from 'axios';
import { Redirect } from 'react-router';
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAllResQuery } from '../../queries/queries';
import { UserRestaurant } from '../../mutations/mutations';
// import { Image as CloudinaryImage } from 'cloudinary-react';
import NavBar from '../../NavBar';

class homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // products: [],
      redirectVar: false,
      // resultTable: [],
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeD = this.handleChangeD.bind(this);
    // this.handleChangeV = this.handleChangeV.bind(this);
  }

  displayAllRest() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      let redirectVar = null;
      if (this.state.redirectVar) {
        redirectVar = <Redirect to="/seerestaurant" />;
      }
      return (
      <div>
        <NavBar />
        {redirectVar}
        <div>
            <Form inline>
                <Container>
                    <Row>
                        <Col>
                        <input type="text" name="inSearch" placeholder=" Search Dish Name, Restaurants, Cuisine, Locations " style={{ width: '500px', height: '35px' }} required />
                        &nbsp; &nbsp; &nbsp;
                        <label>
                        Type of Delivery:
                        <select>
                          <option value="All">Select</option>
                          <option value="Delivery">Delivery</option>
                          <option value="Pickup">Pickup</option>
                          </select>
                        </label>
                        &nbsp; &nbsp; &nbsp;
                        <label>
                        Type of Food:
                        <select>
                        <option value="All">Select</option>
                          <option value="NonVeg">NonVeg</option>
                          <option value="Veg">Veg</option>
                          <option value="Vegan">Vegan</option>
                          </select>
                        </label>
                        &nbsp; &nbsp; &nbsp;
                        <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                    </Container>
                    </Form>
          <Form inline>
            <Container>
              <Row>
              {data.userHomeAllRes.map((item) => <Col>
               <Card style={{ width: '20rem', margin: '2rem' }}>
                <Card.Img
                  variant="top"
                  src={item.uploadURL}
                  style={{ height: '250px' }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Card.Text>
                    {item.location}
                    &nbsp; &nbsp; &nbsp;
                    {item.timings}
                  </Card.Text>
                  <Button variant="success" id={item.p_id} value={item.email} onClick={this.handleVisit}>Visit</Button>
                  {/* <Button variant="outline-warning" size="sm" id={item.email} value={item.email} onClick={this.handleFavourite}>Favourite</Button> */}
                </Card.Body>
              </Card>
              </Col>)}
              </Row>
            </Container>
          </Form>
        </div>
      </div>
      );
    }
  }

  handleVisit = (event) => {
    event.preventDefault();
    const visitdata = {
      email: event.target.value,
    };
    console.log(visitdata);
    this.setState({
      redirectVar: true,
    });
    this.props.UserRestaurant({
      variables: visitdata,
    })
      .then((res) => {
        console.log('Frontend');
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.displayAllRest()}
      </div>
    );
  }
}

export default compose(
  graphql(getAllResQuery),
  graphql(UserRestaurant, { name: 'UserRestaurant' }),
)(homepage);
