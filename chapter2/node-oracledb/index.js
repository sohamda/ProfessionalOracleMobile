var express = require('express');
var flights = require('./flightsapi');
var router = express.Router();

router.get('/api', function(req, res, next) {
	res.render('index', { title: 'Welcome to Airport APIs' });
});

router.get('/api/getAllFlights', function(req, res, next) {
	flights.getFlights(req, res, '', '');
});

router.get('/api/getDepartingFlights', function(req, res, next) {
	flights.getFlights(req, res, 'WHERE IS_ARRIVAL= :is_arrival', 'N');
});

router.get('/api/getArrivingFlights', function(req, res, next) {
	flights.getFlights(req, res, 'WHERE IS_ARRIVAL= :is_arrival', 'Y');
});

router.get('/api/getFlightInfo', function(req, res, next) {
	if(!req.query.flightNo) {
		res.status(500).send({error: " getFlightInfo': Please specify a Flight Number"});
	} else {
		flights.getFlights(req, res, 'WHERE FLIGHT_NUMBER= : flightNo ', req.query.flightNo);
	}
});

router.post('/api/addFlightInfo', function(req, res, next) {
	
	if(!req.body.flightNo || !req.body.place || !req.body.dateTime || !req.body.airlineCode) {
		res.status(500).send({error: "addFlightInfo : Please specify all paramerters"});
	} else {
		flights.addFlightInfo(req, res);
	}
});

router.put('/api/updateFlightInfo/:flightNo', function(req, res, next) {
	var date = new Date(req.body.dateTime);
	flights.updateFlightInfo(req, res, req.params.flightNo, date);
});


module.exports = router;
