/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Axios from 'axios';

export default class temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
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

  render() {
    console.log(this.state.products);
    return (
      <div>
        {this.state.products.map((product) => (
          <div>
            <div>{product.p_name}</div>
            <div>{product.p_id}</div>
          </div>
        ))}
      </div>
    );
  }
}
