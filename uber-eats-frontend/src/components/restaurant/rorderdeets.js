/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import { Modal, Button, Form } from 'react-bootstrap';
import NavBar from '../../NavBar';

export default class rorderdeets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      po_id: 0,
      redirect: false,
      // totalprice: 0,
      openModal: true,
      quantity: 0,
    //   finalp_price: 0,
    //   finalorder: 0,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/rorderdeets')
      .then((res) => {
        if (res) {
          console.log(res.data);
          if (res.data.length >= 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
              menuList.push(res.data[i]);
            }
          }
          this.setState({ products: menuList });
        }
      }).catch((err) => {
        throw err;
      });
  }

  componentDidUpdate(props, state) {
    if (state.quantity !== this.state.quantity) {
      console.log('input changed');
    }
  }

  openModal = () => this.setState({ openModal: true });

  closeModal = () => this.setState({
    openModal: false,
    redirect: true,
  });

  handleSubmit = (event) => {
    event.preventDefault();
    // const finalorderint = parseFloat(event.target.id, 10);
    // console.log(finalorderint);
    // this.setState({ finalorder: finalorderint });
    const {
      products,
    } = this.state;
    console.log(products);
    // Axios.defaults.withCredentials = true;
    // Axios.post('http://localhost:3001/checkout', products)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     console.log(response);
    //     const status = response.status;
    //     if (status !== 200) {
    //       this.setState({
    //         redirect: false,
    //       });
    //     } else {
    //       console.log('Andar');
    //       this.setState({
    //         redirect: true,
    //       });
    //     }
    //   });
    this.setState({ redirect: true });
  }

  handleChange = (e) => {
    this.setState({ quantity: e.target.value });
    const upquantity = {
      po_id: e.target.id,
      quantity: e.target.value,
    };
    console.log(upquantity);
    Axios.defaults.withCredentials = true;
    Axios.post('http://localhost:3001/updatequantity', upquantity)
      .then((res) => {
        console.log(res.status);
      });
  }

  handleDelete = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      po_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      po_id: visitdata,
    });
    console.log(this.state.po_id);
    console.log(this.state.redirectVar);
    Axios.defaults.withCredentials = true;
    Axios.post('http://localhost:3001/deletefromcart', visitdata)
      .then((res) => {
        console.log(res.status);
      });
    this.forceUpdate();
  }

  render() {
    console.log(this.state.products);
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/resorders" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>
          <div><h3 style={{ paddingLeft: '0.5em' }}>Order Details</h3></div>
          <Modal show={this.state.openModal} onHide={this.closeModal}>
            <Modal.Header>
              <Modal.Title>Customer Details</Modal.Title>
            </Modal.Header>
            {this.state.products.slice(0, 1).map((item) => <div>
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
            {this.state.products.map((item) => <div>
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
