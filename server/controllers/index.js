var models = require('../models');
var mysql = require('mysql');
var fs = require('path');
var bodyParser = require('body-parser');
var app = require('../app.js');

var dbConnection = mysql.createConnection({
      user: "root",
      password: "abc",
      database: "chat"
    });

dbConnection.connect();

//app.use(bodyParser.json());



module.exports = {
  messages: {
    get: function (req, res) {
        models.messages.get(null, function(results) {
          res.send(JSON.stringify(results));
        });
      }, // a function which handles a get request for all messages
    post: function (req, res) {
      // var body = "";
      // console.log("req: ",req)
      // req.on('data', function(chunk) {
        // console.log('data received');
        // body += chunk;
      // });
      // req.on('end', function(err, req, res) {
        // console.log("entered end event");
        var username = req.body.username;
        var messageBody = req.body.text;
        var room = req.body.roomname || 'lobby';
        models.messages.post(null, username,messageBody,room);
        //console.log('post received');
        res.send("Success");
    // });
      // res.end();
  }
},

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(null, function(results) {
        res.send(JSON.stringify(results));
      });
    },
    post: function (req, res) {
      // var body = "";
      // req.on('data', function(chunk) {
        console.log('data received');
        // body += chunk;
      // });
      // req.on('end', function(err, req, res) {
        console.log("entered end event");
        var username = req.body.username;
        models.users.post(null, username);
        //console.log('post received');
        res.send("Success");
    // });
      // res.end();
    }
  }


};
