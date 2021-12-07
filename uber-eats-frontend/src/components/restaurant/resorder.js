/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable dot-notation */
/* eslint-disable no-else-return */
/* eslint-disable brace-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import Axios from 'axios';
// import { Redirect } from 'react-router';
// import { connect } from 'react-redux';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getResAllOrdersQuery } from '../../queries/queries';
import { resOrderActionsMutation } from '../../mutations/mutations';
import NavBar from '../../NavBar';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class resorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_status: '',
      notifyUpdate: false,
    };
  }

  displayOrders() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      let UpdateNotif = null;
      if (this.state.notifyUpdate) {
        UpdateNotif = this.notify();
      }
      return (
        <div>
          <NavBar />
          {UpdateNotif}
          <div>
            <Form inline>
              <Container>
                <Row>
                  <Col>
                    <label>
                      Order Status: &nbsp;
                      <select onChange={this.handleChangeOS}>
                        <option>Select</option>
                        <option value="Ordered">Order Received</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                      </select>
                    </label>
                        &nbsp; &nbsp; &nbsp;
                    <Button type="submit" onClick={this.handleFilter}>Filter Order</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
            <div><h3>&nbsp;&nbsp;Order Management</h3></div>
            <table>
              <thead>
                <tr>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>OID</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Customer Name</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Profile</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Location</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Contact</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Time</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Status</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Order Details</td>
                  <td style={{ textAlign: 'left', padding: '1em', paddingTop: '2em' }}>Change Order Status</td>
                </tr>
              </thead>
              <tbody>
                {data.getResAllOrders.map((item, i) =>
                // eslint-disable-next-line implicit-arrow-linebreak
                  <tr>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{i + 1}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.name}</td>
                    <Button variant="info" id={item.email} onClick={this.profileVisit}>View</Button>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.location}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.contact}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.ordertime}</td>
                    <td style={{ textAlign: 'left', padding: '1em' }}>{item.order_status}</td>
                    <td><Button variant="dark">Order Details</Button></td>
                    <label>
                      <select onChange={this.handleChangeActions}>
                        <option>Select</option>
                        <option value="Ordered">Order Received</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                      </select>
                    </label>
                        &nbsp; &nbsp; &nbsp;
                    <Button type="submit" id={item.ordertime} value={item.order_status} onClick={this.handleActions}>Confirm Action</Button>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  finalActions = (actionData) => {
    console.log(actionData);
    this.props.resOrderActionsMutation({
      variables: actionData,
      refetchQueries: [{ query: getResAllOrdersQuery }],
    })
      .then((res) => {
        // console.log('Frontend for Restaurant Orders!');
        // console.log(res);
        // console.log(res.data);
        this.setState({
          notifyUpdate: true,
        });
      }).catch((err) => {
        console.log(err);
      });
  }

  handleChangeActions = (e) => {
    this.setState({
      order_status: e.target.value,
    });
  }

  handleActions = (e) => {
    e.preventDefault();
    const actionData = {
      ordertime: e.currentTarget.id,
      order_status: this.state.order_status,
    };
    this.finalActions(actionData);
  }

  notify = () => {
    toast.success('Order Status Updated!');
  };

  render() {
    return (
      <div>
        {this.displayOrders()}
      </div>
    );
  }
}

export default compose(
  graphql(getResAllOrdersQuery),
  graphql(resOrderActionsMutation, { name: 'resOrderActionsMutation' }),
)(resorder);
