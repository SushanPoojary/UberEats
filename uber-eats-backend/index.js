var express = require('express');
var app = express();
app.use(express.json(({ limit: '10MB' })));
const passport = require("passport");
app.use(passport.initialize());
var session = require('express-session');
const {cloudinary} = require('./cloudinary');
const mongoDB = require('./mongoconfig.json');
var mongo = mongoDB.mongoURI;
const mongoose = require('mongoose');
// var mysql = require('mysql');
// var constants = require('./config.json');
const { graphqlHTTP } = require('express-graphql');
var schema = require('./graphqlSchema/schema');
var cors = require('cors');
var jwt = require('jsonwebtoken');
// var kafka = require('./kafka/client');
app.use(cors());

// var ipAdd='localhost';
// `http://${ipAdd}:3000`

const JWT_KEY = 'UberEatsSP#07'

app.use(session({
  secret              : 'ubereats',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000,
}));



const users = require('./models/user');
const test = require('./models/test');
const restaurants = require('./models/restaurant');
const menus = require('./models/menu');
const favourites = require('./models/favourite');
const carts = require('./models/cart');
const orders = require('./models/order');
// const { auth } = require('./passport');
// auth();
// const { checkAuth } = require('./passport');
// const { checkAuthR } = require('./passport');


var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500,
    // bufferMaxEntries: 0
}

mongoose.connect(mongo, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log("MongoDB connection failed.");
    } else {
        console.log("MongoDB Connected");
    }
})



app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


app.use("/graphql", 
    (req, res) => {
        return graphqlHTTP(
    {
        schema: schema,
        rootValue: global,
        graphiql: true,
        context: {req, res},
    })(req, res);
});


app.listen(3001, () => console.log('GraphQL Server listening on port 3001'));

module.exports = app;