/* eslint-disable no-else-return */
/* eslint-disable react/sort-comp */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-globals */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// import Axios from 'axios';
import { Redirect } from 'react-router';
// import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getUserReceipt } from '../../queries/queries';
import NavBar from '../../NavBar';

class uorderdeets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      redirect: false,
      openModal: true,
    };
  }

  displayReceipt() {
    const data = this.props.data;
    console.log(data);
    console.log(JSON.stringify(data));
    if (data.loading) {
      return (<div>Loading Data...</div>);
    } else {
      let redirectVar = null;
      if (this.state.redirect) {
        redirectVar = <Redirect to="/order" />;
      }
      return (
        <div>
          {redirectVar}
          <NavBar />
          <div>
            <div><h3 style={{ paddingLeft: '0.5em' }}>Order Details</h3></div>
            <Modal show={this.state.openModal} onHide={this.closeModal}>
              <Modal.Header>
                <Modal.Title>Order Details</Modal.Title>
              </Modal.Header>
              {data.getUserReceipt.slice(0, 1).map((item) => <div>
                <Form.Group>
                  <Modal.Body>
                    {item.name}
                    <br />
                    Address: &nbsp;
                    {item.add1}
                    <br />
                    Contact: &nbsp;
                    {item.contact}
                    <br />
                    Order Status: &nbsp;
                    {item.order_status}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Modal.Body>
                </Form.Group>
              </div>)}
              {data.getUserReceipt.map((item) => <div>
                <Form.Group>
                  <Modal.Body>
                    Dish: &nbsp;
                    {item.p_name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Quantity: &nbsp;
                    {item.quantity}
                    <br />
                    Special Instruction: &nbsp;
                    {item.sp_inst}
                  </Modal.Body>
                </Form.Group>
              </div>)}
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
    }
  }

  openModal = () => this.setState({ openModal: true });

  closeModal = () => this.setState({
    openModal: false,
    redirect: true,
  });

  render() {
    console.log(this.state.products);
    return (
      <div>
        {this.displayReceipt()}
      </div>
    );
  }
}

export default compose(
  graphql(getUserReceipt),
)(uorderdeets);
