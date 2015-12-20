var controllers = require('./controllers');
var router = require('express').Router();


for (var route in controllers) {
  console.log('reached router');
  router.route("/classes/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}

module.exports = router;

