var express = require('express');
var app = express();
app.use(express.json());
var mysql = require('mysql');
var constants = require('./config.json');
var cors = require('cors');
app.use(cors());

// var connection = mysql.createConnection({})
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
  //connectionLimit: 99
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
  })
})

app.post('/login', (req, res)=> {
  const useremail = req.body.email
  const userpassword = req.body.password
  console.log("here");
  connection.query("SELECT email,password FROM uber_eats.test WHERE email = ? AND password = ?", [useremail, userpassword], 
  (err, results) => {
    console.log(err);
    console.log(results);
  })
})

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3001, function () {
  console.log('Server listening on port 3001!');
});

module.exports = app;