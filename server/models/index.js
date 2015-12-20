var db = require('../db');
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
      user: "root",
      password: "abc",
      database: "chat"
    });

dbConnection.connect();

module.exports = {

  messages: {
    get: function (err, callback) {
      var queryString = "SELECT messages.Body, Usernames.Name AS user, Rooms.Name AS room FROM  messages INNER JOIN Usernames ON messages.Usernames_id = Usernames.id INNER JOIN Rooms ON Rooms.id = messages.Rooms_id";
        //var queryString = "SELECT * FROM messages";
      dbConnection.query(queryString, function(err, results) {
        // console.log(results)
        callback(results);
      // trigeer
      });
    }, // a function which produces all the messages
    post: function (err, username, messageBody, room) {
      var queryStringName = "INSERT INTO Usernames SET `Name` = '" + username +"'";
      dbConnection.query(queryStringName, function(err, results) {
        console.log("Inserting query: ", results);
        //I don't want to close the response here
        //but I do want to insert into the tables
      });
                  

      var queryStringRoom = "INSERT INTO Rooms SET `Name` = '"+room+"'";
      dbConnection.query(queryStringRoom, function(err, results) {

      });

      //`Rooms_id` = (SELECT `Rooms_id` FROM Rooms WHERE `Name` = '" + room + "'),
        //FOREIGN KEY(Rooms_id) References Rooms(id), FOREIGN KEY(Usernames_id) References Usernames(id));

      var queryStringBody = "INSERT INTO messages SET `Body`='" + messageBody + "',`Rooms_id`=1,`Usernames_id`=1";

      dbConnection.query(queryStringBody, function(err, results) {

      });
      var checkingQuery = "SELECT * FROM messages";
      dbConnection.query(checkingQuery, function(err, results) {
        console.log("Checking query -messages: ", results);
      }); // a function which can be used to insert a message into the database
  }
},

  users: {
    // Ditto as above.
    get: function (err, callback) {
      var queryString = "SELECT * Usernames";
        //var queryString = "SELECT * FROM messages";
      dbConnection.query(queryString, function(err, results) {
        // console.log(results)
        callback(results);
      // trigeer
      });
    },
    post: function (err, username) {
      var queryStringName = "INSERT INTO Usernames SET `Name` = '" + username +"'";
      dbConnection.query(queryStringName, function(err, results) {
        console.log("Inserting query: ", results);
        //I don't want to close the response here
        //but I do want to insert into the tables
      });
      }      
    }
  };

