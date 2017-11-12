var express = require('express');
var flights = require('./flightsapi');
var router = express.Router();

router.get('/api/getAllFlights', function(req, res, next) {
  flights.getAllFlights(req, res);
});


module.exports = router;
