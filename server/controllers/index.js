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
        models.messages.get(null, function(results) {
          res.send(JSON.stringify(results));
        });
      }, // a function which handles a get request for all messages
    post: function (req, res) {
      var body = "";
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function(err, req, res) {
        var username = JSON.parse(body).username;
        var messageBody = JSON.parse(body).text;
        var room = JSON.parse(body).roomname || 'lobby';
        models.messages.post(err, username,messageBody,room);
        //console.log('post received');
        res.send();
    });
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
      var body = "";
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function(err, req, res) {
        var username = JSON.parse(body).username;
        models.users.post(err, username);
        //console.log('post received');
        res.send();
    });
    }
  }
};
