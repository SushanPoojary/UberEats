import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// import Navigation from './Navbar';
import Routes from './Routes';
import store from './store/index';
//

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
});

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
          {/* <Navigation /> */}
          <Routes />
        </Provider>
      </ApolloProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
