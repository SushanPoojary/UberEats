/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Redirect } from 'react-router';
import NavBar from '../../NavBar';

export default class resAddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      p_id: 0,
      redirect: false,
    };
  }

  componentDidMount() {
    const menuList = [];
    Axios.defaults.withCredentials = true;
    Axios.get('http://localhost:3001/resAddItems')
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

  handleEdit = (event) => {
    event.preventDefault();
    const orderNum = parseInt(event.target.id, 10);
    const visitdata = {
      p_id: orderNum,
    };
    console.log(visitdata);
    this.setState({
      p_id: visitdata,
    });
    console.log(this.state.p_id);
    console.log(this.state.redirect);
    Axios.defaults.withCredentials = true;
    Axios.post('http://localhost:3001/editmenu', visitdata)
      .then((res) => {
        console.log(res.status);
        this.setState({ redirect: true });
      });
  }

  render() {
    console.log(this.state.products);
    let redirectVar = null;
    if (this.state.redirect) {
      redirectVar = <Redirect to="/editmenu" />;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div>
          <div>
            <Form inline>
              <Container>
                <Row>
                  {this.state.products.map((item) => <Col>
                    <Card style={{ width: '20rem', margin: '2rem' }}>
                      <Card.Img
                        variant="top"
                        src={item.uploadURL}
                        style={{ height: '250px' }}
                      />
                      <Card.Body>
                        <Card.Title>{item.p_name}</Card.Title>
                        <Card.Text>
                          {item.p_description}
                        </Card.Text>
                        <Card.Text>
                          {item.p_ingredients}
                    &nbsp; &nbsp; &nbsp;
                          $
                          {item.p_price}
                        </Card.Text>
                        <Button variant="success" id={item.p_id} value="Edit" onClick={this.handleEdit}>Edit</Button>
                        <Button variant="outline-danger" id={item.p_id} value="Delete">Delete</Button>
                      </Card.Body>
                    </Card>
                  </Col>)}
                </Row>
              </Container>
            </Form>
          </div>
          <Form className="offset-sm-9" inline>
            <Button variant="success" href="/addmenu">Add</Button>
          </Form>
        </div>
      </div>
    );
  }
}
