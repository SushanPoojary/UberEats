/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
/* eslint-disable react/sort-comp */
/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import Axios from 'axios';
// import { connect } from 'react-redux';
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
import { getResMenuQuery } from '../../queries/queries';
import { addToCartMutation } from '../../mutations/mutations';
import NavBar from '../../NavBar';

class seeRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      po_id: 0,
      price: 0,
      redirectVar: false,
      name: '',
      location: '',
      description: '',
      // contact: '',
      timings: '',
      isOpen: false,
      // delivery: '',
      // pickup: '',
    };
  }

  displayMenu() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      return (
        <div>
          <NavBar />
          <div>
            <Form inline>
              <Container>
                <Row>
                {data.getResMenu.map((item) => <Col>
                 <Card style={{ width: '20rem', margin: '2rem' }}>
                  <Card.Img variant="top" src={item.uploadURL} style={{ height: '250px' }} />
                  <Card.Body>
                    <Card.Title>{item.p_name}</Card.Title>
                    <Card.Text>
                      {item.p_ingredients}
                      <br />
                    </Card.Text>
                    <Card.Text>
                      $
                      {item.p_price}
                    </Card.Text>
                    <Button variant="success" id={item.p_id} value={item.p_price} name={this.state.name} onClick={this.handleCart}>Add To Cart</Button>
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

  handleCart = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      po_id: orderNum,
      price: event.target.value,
    };
    console.log(visitdata);
    this.props.addToCartMutation({
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
    console.log(this.state.products);
    return (
      <div>
        {this.displayMenu()}
      </div>
    );
  }
}

export default compose(
  graphql(getResMenuQuery),
  graphql(addToCartMutation, { name: 'addToCartMutation' }),
)(seeRestaurant);
