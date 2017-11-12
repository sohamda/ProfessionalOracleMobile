var express = require('express');
var flights = require('./flightsapi');
var router = express.Router();

router.get('/api/getAllFlights', function(req, res, next) {
	flights.getFlights(req, res, '', '');
});

router.get('/api/getDepartingFlights', function(req, res, next) {
	flights.getFlights(req, res, 'WHERE IS_ARRIVAL=false', '');
});

router.get('/api/getArrivingFlights', function(req, res, next) {
	flights.getFlights(req, res, 'WHERE IS_ARRIVAL=true', '');
});

router.get('/api/getFlightInfo', function(req, res, next) {
	if(!req.query.flightNo) {
		res.status(500).send({error: " getFlightInfo': Please specify a Flight Number"});
	} else {
		flights.getFlights(req, res, 'WHERE IS_ARRIVAL= : flightNo ', req.query.flightNo);
	}
});

module.exports = router;
