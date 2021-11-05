var express = require('express');
var app = express();
app.use(express.json(({ limit: '10MB' })));
const passport = require("passport");
app.use(passport.initialize());
var session = require('express-session');
const {cloudinary} = require('../cloudinary');
var jwt = require('jsonwebtoken');
const mongoDB = require('../config/mongoconfig.json');
var mongo = mongoDB.mongoURI;
const mongoose = require('mongoose');
const JWT_KEY = 'UberEatsSP#07'

app.use(session({
  secret              : 'ubereats',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000,
}));

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500,
    // bufferMaxEntries: 0
}


const restaurants = require('../models/restaurant');
const { auth } = require('../passport/passport');
auth();
const { checkAuthR } = require('../passport/passport');

exports.handle_request = function restaurant(msg, callback) {
    console.log("restaurant path:", msg.path);
    switch (msg.path) {
        case "reslogin":
            reslogin(msg, callback);
            break;
    }
};

function reslogin(msg, callback){
   
    console.log("Inside restaurantlogin kafka backend");
    console.log(msg);
    console.log("In handle request:"+ JSON.stringify(msg));
    mongoose.connect(mongo, options, function(err,db){
        if(err){
            callback(null,"Cannot connect to db");
        }
        else{
            const useremail = msg.body.email;
            const userpassword = msg.body.password;
            console.log(useremail);
            console.log(userpassword);
            console.log("Rest Login here");
            restaurants.findOne({ email: useremail, password: userpassword }, function(err, results) {
                if(err) {
                    // res.send({err: err});
                    // console.log(err);
                    callback(null,{err: err})
                    // console.log("Error");
                }
                if (results) {
                    // res.cookie('cookie',useremail,{maxAge: 900000, httpOnly: false, path : '/'});
                    // console.log(results.email);
                    session.remail = results.email;
                    session.isLoggedIn = true;
                    console.log(session.remail);
                    console.log(session.isLoggedIn);
                    // console.log(results);
                    // session.save();   
                    const payload = { _id: results._id, username: results.email};
                    // console.log(payload);
                    const tokenr = jwt.sign(payload, JWT_KEY, {
                        expiresIn: 1008000
                    })
                    let token = jwt.sign({useremail: useremail}, JWT_KEY);
                    // res.json({
                    //     "status": 200,
                    //     "token": token,
                    //     "JWT": "JWT" + " " + tokenus
                    // });
                    callback(null,{"status": 200, "token": token, "JWT": "JWT" + " " + tokenr});
                    // res.end("Successful Login!");
                    // return;
                    }
                else {
                    // res.json({
                    //     "status": 403
                    // })
                    callback(null,{"status": 403});
                    console.log(results);
                }
            });
            }})
};


