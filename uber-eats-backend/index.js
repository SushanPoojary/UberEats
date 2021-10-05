var express = require('express');
var app = express();
app.use(express.json());
var session = require('express-session');

var mysql = require('mysql');
var constants = require('./config.json');
var cors = require('cors');
var jwt = require('jsonwebtoken');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const JWT_KEY = 'UberEatsSP#07'

app.use(session({
  secret              : 'ubereats',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000,
}));


// var connection = mysql.createConnection({})
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
  connectionLimit: 99
});


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
  console.log("Reg here");
  console.log(username)
  if(username != '' && usercontact != '' && useremail != '' && userpassword != ''){
  connection.query("INSERT INTO uber_eats.test(name, contact, email, password) VALUES (?,?,?,?)", [username, usercontact, useremail, userpassword], 
  (err, results) => {
    console.log(err);
    console.log(results);
    res.send(results);
  });
}
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
      req.session.email = results[0].email;
      req.session.isLoggedIn = true;
      console.log(req.session.email);
      console.log(req.session.isLoggedIn);
      req.session.save();   
      let token = jwt.sign({useremail: useremail}, JWT_KEY);
      res.json({
        "status": 200,
        "token": token
      });
      res.end("Successful Login!");
      // res.send(results);
      // console.log("Idhar?")
      // req.session.dbUser = dbUser;
      // console.log(req.session.dbUser);
      // console.log(results);
      return;
    } else {
      res.json({
        "status": 403
      })
      console.log(results);
    }
  })
})

app.post('/resReg', (req, res)=> {
  const username = req.body.username
  const userlocation = req.body.location
  const useremail = req.body.email
  const userpassword = req.body.password
  console.log("Reg here");
  console.log(username)
  if(username != '' && userlocation != '' && useremail != '' && userpassword != ''){
  connection.query("INSERT INTO uber_eats.restest(name, email, password, location) VALUES (?,?,?,?)", [username, useremail, userpassword, userlocation], 
  (err, results) => {
    console.log(err);
    console.log(results);
    res.send(results);
  });
}
})

app.post('/reslogin', (req, res)=> {
  const useremail = req.body.email
  const userpassword = req.body.password
  const dbUser = (useremail, userpassword)
  console.log("here");
  connection.query("SELECT email,password FROM uber_eats.restest WHERE email = ? AND password = ?", [useremail, userpassword], 
  (err, results) => {
    if (err) {
      res.send({err: err});
      console.log("Error");
    } 
    if (results.length > 0) {
      res.cookie('cookie',constants.DB.username,{maxAge: 900000, httpOnly: false, path : '/'});
      req.session.email = results[0].email;
      req.session.isLoggedIn = true;
      console.log(req.session.email);
      console.log(req.session.isLoggedIn);
      req.session.save();   
      let token = jwt.sign({useremail: useremail}, JWT_KEY);
      res.json({
        "status": 200,
        "token": token
      });
      res.end("Successful Login!");
      // res.send(results);
      // console.log("Idhar?")
      // req.session.dbUser = dbUser;
      // console.log(req.session.dbUser);
      // console.log(results);
      return;
    } else {
      res.json({
        "status": 403
      })
      console.log("Error1");
    }
  })
})



app.get('/resProfile', (req, res) => {
  console.log('Res Profile')
  console.log(req.session);
  if (!req.session.isLoggedIn) {
      res.sendStatus(404);
      console.log("Not Logged In");
  } else {
      let profileSQL = "SELECT * FROM uber_eats.restest WHERE email = ?";
      connection.query(profileSQL, [req.session.email], (err, results) => {
          if (err) {
              throw err;
          } else if (results.length > 0) {
              console.log(results);
              res.status(200).send(results);
          } else {
              console.log("Can't find user for profile page!");
          }
      });
  }
});

app.post('/resupdateProfile', (req, res) => {
  console.log('Res Update profile')
  console.log(req.body);
  const {name, location, description, contact, timing } = req.body;
  if (!req.session.isLoggedIn) {
      console.log("User has to be logged in to update profile...");
  } else {
      let updateProfile = "UPDATE uber_eats.restest " + "SET name = ?, location = ?, description = ?, contact = ?, timings = ? WHERE email = ?";
      connection.query(updateProfile, [name, location, description, contact, timing, req.session.email], (err, res) => {
          if (err) {
              throw err;
          } else {
              console.log('Updated Profile Successfully!');
          }
      });
  }
});

app.get('/userProfile', (req, res) => {
  console.log('user Profile')
  console.log(req.session);
  if (!req.session.isLoggedIn) {
      res.sendStatus(404);
      console.log("Not Logged In");
  } else {
      let profileSQL = "SELECT * FROM uber_eats.test WHERE email = ?";
      connection.query(profileSQL, [req.session.email], (err, results) => {
          if (err) {
              throw err;
          } else if (results.length > 0) {
              console.log(results);
              res.status(200).send(results);
          } else {
              console.log("Can't find user for profile page!");
          }
      });
  }
});

app.post('/updateProfile', (req, res) => {
  console.log('Update profile')
  console.log(req.body);
  const {name, location, description, contact, timing } = req.body;
  if (!req.session.isLoggedIn) {
      console.log("User has to be logged in to update profile...");
  } else {
      let updateProfile = "UPDATE uber_eats.test " + "SET name = ?, location = ?, description = ?, contact = ?, timings = ? WHERE email = ?";
      connection.query(updateProfile, [name, location, description, contact, timing, req.session.email], (err, res) => {
          if (err) {
              throw err;
          } else {
              console.log('Updated Profile Successfully!');
          }
      });
  }
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
// app.listen(3001, function () {
//   console.log('Server listening on port 3001!');
// });

app.listen(3001, () => console.log('Server listening on port 3001'));

module.exports = app;