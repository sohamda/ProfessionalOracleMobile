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

router.get('/api/getFlightByNumberAndPlace', function(req, res, next) {
	if(!req.query.flightNo || !req.query.place) {
		res.status(401).send({error: "getFlightByNumberAndPlace: Please specify a Flight Number and Arrival/Departure City"});
	} else {
		flights.getFlights(req, res, "WHERE FLIGHT_NUMBER = : flightNo  AND PLACE = :place", [req.query.flightNo, req.query.place]);
	}
});

router.get('/api/flightInfo/:flightNo', function(req, res, next) {
	if(!req.params.flightNo) {
		res.status(401).send({error: "flightInfo: Please specify a Flight Number"});
	} else {
		flights.getFlights(req, res, 'WHERE FLIGHT_NUMBER= : flightNo ', req.params.flightNo);
	}
});

router.put('/api/FlightInfo/:flightNo', function(req, res, next) {
	if(!req.params.flightNo || !req.body.dateTime) {
		res.status(401).send({error: "flightInfo: Please specify a Flight Number and Date"});
	} else {
		var date = new Date(req.body.dateTime);
		flights.updateFlightInfo(req, res, req.params.flightNo, date);
	}
});

router.post('/api/flightInfo', function(req, res, next) {	
	if(!req.body.flightNo || !req.body.place || !req.body.dateTime || !req.body.airlineCode) {
		res.status(401).send({error: "flightInfo : Please specify all paramerters"});
	} else {
		flights.addFlightInfo(req, res);
	}
});




module.exports = router;
