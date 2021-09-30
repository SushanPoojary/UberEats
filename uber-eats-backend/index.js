var express = require('express');
var app = express();
app.use(express.json());
var session = require('express-session');
var mysql = require('mysql');
var constants = require('./config.json');
var cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// var connection = mysql.createConnection({})
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
  connectionLimit: 99
});

app.use(session({
  secret              : 'ubereats',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

connection.getConnection((err) => {
  if(err) {
    throw 'Error Occured: ' + err;
  }
  console.log("Pool Created.")
});

app.get('/test_api', async function (req, res){
  await connection.query(`SELECT * FROM test`, async function (error, results){
    if (error){
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(error.code);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify(results));
    }
  })
})

app.post('/userReg', (req, res)=> {
  const username = req.body.username
  const usercontact = req.body.contact
  const useremail = req.body.email
  const userpassword = req.body.password
  console.log("here");
  connection.query("INSERT INTO uber_eats.test(name, contact, email, password) VALUES (?,?,?,?)", [username, usercontact, useremail, userpassword], 
  (err, results) => {
    console.log(err);
    console.log(results);
    res.send(results);
  })
})

app.post('/login', (req, res)=> {
  const useremail = req.body.email
  const userpassword = req.body.password
  const dbUser = (useremail, userpassword)
  console.log("here");
  connection.query("SELECT email,password FROM uber_eats.test WHERE email = ? AND password = ?", [useremail, userpassword], 
  (err, results) => {
    if (err) {
      res.send({err: err});
      console.log(err);
    } 
    if (results.length > 0) {
      res.cookie('cookie',constants.DB.username,{maxAge: 900000, httpOnly: false, path : '/'});
      res.send(results);
      // console.log("Idhar?")
      req.session.dbUser = dbUser;
      console.log(req.session.dbUser);
      console.log(results);
      return;
    } else {
      res.send(results)
      console.log(results);
    }
  })
})

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3001, function () {
  console.log('Server listening on port 3001!');
});

module.exports = app;