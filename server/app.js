var express = require('express');
var db = require('./db');
var cors = require('cors');
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
      user: "root",
      password: "abc",
      database: "chat"
    });

dbConnection.connect();
// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

app.use(cors());

app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('X-HTTP-Method-Override')

    if ('OPTIONS' === req.method) {
      res.writeHead(200);
    }
    // else if ('GET' === req.method) {
    //   //fill this in later
    //   res.writeHead(200);
    // }
    else {
          next();
        }
  });

app.get('/classes/messages', function(req, res) {
        var queryString = "SELECT * FROM messages";
      dbConnection.query(queryString, function(err, results) {
        console.log(results);
        res.send(JSON.stringify(results));
      });
  //res.end("Received");
});
app.get('/', function(req, res) {
        var queryString = "SELECT * FROM messages";
      dbConnection.query(queryString, function(err, results) {
        console.log(err);
        res.send(JSON.stringify(results));
      });
  //res.end("Received");
});
app.post('/', function(req, res) {
  console.log("Server thinks posted");
  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function(err, req, res) {
      var username = JSON.parse(body).username;
      //console.log(username);
      var messageBody = JSON.parse(body).text;
      var room = JSON.parse(body).roomname;
      //var queryStringName = "INSERT INTO Usernames (Name) VALUES ('" + username + "')";
      //var queryStringName = "INSERT INTO Usernames VALUES ('Max')";
      var queryStringName = "INSERT INTO Usernames SET `Name` = 'Max'";
      dbConnection.query(queryStringName, function(err, results) {
        console.log(results);
        //I don't want to close the response here
        //but I do want to insert into the tables
      });
      var queryStringRoom = "INSERT INTO Rooms (Name) VALUES ('"  + room + "')";
      dbConnection.query(queryStringRoom, function(err, results) {

      });
      var queryStringBody = "INSERT INTO messages (Body, Rooms_id, Usernames_id) VALUES ( '" + messageBody + "', (SELECT Rooms_id FROM Rooms), (SELECT Usernames_id FROM Usernames))";

      dbConnection.query(queryStringBody, function(err, results) {

      });
  });

  res.send("Posted");
});
//app.get('/', routes.index);




// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/", router);

// Serve the client files
//this line routes GET requests
app.use(express.static(__dirname + "/../client"));


//handle CORS 


// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

