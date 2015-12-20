var express = require('express');
var db = require('./db');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');

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

app.use(bodyParser.json());

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

// app.get('/classes/messages', function(req, res) {
//         var queryString = "SELECT messages.Body, Usernames.Name AS user, Rooms.Name AS room FROM messages INNER JOIN Usernames ON messages.Usernames_id = Usernames.id INNER JOIN Rooms ON Rooms.id = messages.Rooms_id";
//       dbConnection.query(queryString, function(err, results) {
//         console.log(results);
//         res.send(JSON.stringify(results));
//       });
//   //res.end("Received");
// });
// app.get('/', function(req, res) {
//   var queryString = "SELECT messages.Body, Usernames.Name AS user, Rooms.Name AS room FROM  messages INNER JOIN Usernames ON messages.Usernames_id = Usernames.id INNER JOIN Rooms ON Rooms.id = messages.Rooms_id";
//         //var queryString = "SELECT * FROM messages";
//       dbConnection.query(queryString, function(err, results) {
//         console.log(results);
//         res.send(JSON.stringify(results));
//       });
//   //res.end("Received");
// });
// app.post('/', function(req, res) {
//   console.log("Server thinks posted");
//   var body = "";
//   req.on('data', function(chunk) {
//     body += chunk;
//   });
//   req.on('end', function(err, req, res) {
//     // console.log(req);
//       var username = JSON.parse(body).username;
//       //console.log(username);
//       var messageBody = JSON.parse(body).text;
//       // console.log(messageBody);
//       var room = JSON.parse(body).roomname || 'lobby';
//       //var queryStringName = "INSERT INTO Usernames (Name) VALUES ('" + username + "')";
//       //var queryStringName = "INSERT INTO Usernames VALUES ('Max')";

//       //remember to reset to actual usernames
//       var queryStringName = "INSERT INTO Usernames SET `Name` = '" + username +"'";
//       dbConnection.query(queryStringName, function(err, results) {
//         console.log("Inserting query: ", results);
//         //I don't want to close the response here
//         //but I do want to insert into the tables
//       });
                  

//       var queryStringRoom = "INSERT INTO Rooms SET `Name` = '"+room+"'";
//       dbConnection.query(queryStringRoom, function(err, results) {

//       });

//       //`Rooms_id` = (SELECT `Rooms_id` FROM Rooms WHERE `Name` = '" + room + "'),
//         //FOREIGN KEY(Rooms_id) References Rooms(id), FOREIGN KEY(Usernames_id) References Usernames(id));

//       var queryStringBody = "INSERT INTO messages SET `Body`='" + messageBody + "',`Rooms_id`=1,`Usernames_id`=1";

//       dbConnection.query(queryStringBody, function(err, results) {

//       });
//       var checkingQuery = "SELECT * FROM messages";
//       dbConnection.query(checkingQuery, function(err, results) {
//         console.log("Checking query -messages: ", results);
//       });

//   });

//   res.send("Posted");
// });

// app.post('/classes/messages', function(req, res) {
//   console.log("Server thinks posted");
//   var body = "";
//   req.on('data', function(chunk) {
//     body += chunk;
//   });
//   req.on('end', function(err, req, res) {
//     console.log(JSON.parse(body));
//       var username = JSON.parse(body).username;
//       console.log(username);
//       var messageBody = JSON.parse(body).text;
//       console.log(messageBody);
//       var room = JSON.parse(body).roomname || 'lobby';
//       console.log(room);
//       //var queryStringName = "INSERT INTO Usernames (Name) VALUES ('" + username + "')";
//       //var queryStringName = "INSERT INTO Usernames VALUES ('Max')";

//       //remember to reset to actual usernames
//       var queryStringName = "INSERT INTO Usernames SET `Name` = '" + username +"'";
//       dbConnection.query(queryStringName, function(err, results) {
//         console.log("Inserting query: ", results);
//         //I don't want to close the response here
//         //but I do want to insert into the tables
//       });

                  

//       var queryStringRoom = "INSERT INTO Rooms SET `Name` = '"+room+"'";
//       dbConnection.query(queryStringRoom, function(err, results) {

//       });


//       //`Rooms_id` = (SELECT `Rooms_id` FROM Rooms WHERE `Name` = '" + room + "'),
//         //FOREIGN KEY(Rooms_id) References Rooms(id), FOREIGN KEY(Usernames_id) References Usernames(id));

//       //var queryStringBody = "INSERT INTO messages SET `Body`='" + messageBody + "',`Rooms_id`='" + room + "',`Usernames_id`='" + username + "'";
//       var queryStringBody = "INSERT INTO messages SET `Body`='In mercy's name, three days is all I need.'";
//       dbConnection.query(queryStringBody, function(err, results) {

//       });
//       var checkingQuery = "SELECT * FROM messages";
//       dbConnection.query(checkingQuery, function(err, results) {
//         console.log("Checking query -messages: ", results);
//       });
//       // var checkingQuery = "SELECT * FROM messages";
//       // dbConnection.query(checkingQuery, function(err, results) {
//       //   console.log("Checking query -messages: ", results);
//       // });

//   });

//   res.send("Posted");
// });
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

