var models = require('../models');
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
      user: "root",
      password: "abc",
      database: "chat"
    });

dbConnection.connect();



module.exports = {
  messages: {
    get: function (req, res) {
      // var queryString = "SELECT * FROM messages";
      // dbConnection.query(queryString, function(err, results) {
      //   res.end(JSON.stringify(results));
      // });

console.log('reached get method');
      //dbConnection.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {

      console.log('reached post method');
      //process the request, sort out name, body, room
      // var username = req.body.username;
      // console.log(username);
      // var messageBody = req.body.message;
      // var room = req.body.roomname;
      // var queryStringName = "INSERT INTO Usernames (Name) VALUES ('" + username + "')";
      // dbConnection.query(queryStringName, function(err, results) {
      //   //I don't want to close the response here
      //   //but I do want to insert into the tables
      // });
      // var queryStringRoom = "INSERT INTO Rooms (Name) VALUES ('"  + room + "')";
      // dbConnection.query(queryStringRoom, function(err, results) {

      // });
      // var queryStringBody = "INSERT INTO messages (Body, Rooms_id, Usernames_id) VALUES ( '" + messageBody + "', (SELECT Rooms_id FROM Rooms), (SELECT Usernames_id FROM Usernames))";

      // dbConnection.query(queryStringBody, function(err, results) {

      // });
      // res.end(200);
      //dbConnection.end();
    } // a function which handles posting a message to the database
  },

  // users: {
  //   // Ditto as above
  //   get: function (req, res) {},
  //   post: function (req, res) {}
  // }
};

