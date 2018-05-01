
var oracledb = require('oracledb'); 
var dbutil = require('./utils/dbutil'); 

module.exports = {
	
	getAllFlights: function(request, response) {
		console.log('called');
		getFlights(request, response, '', '');
	}, //getAllFlights
	
	getFlights: function(request, response, whereClause, bindVariables) {
		dbutil.handleDatabaseOperation( request, response, 
			function (request, response, connection) {
				var selectStatement = "SELECT FLIGHT_NUMBER," +
							"AIRPORTS.CITY || ',' || AIRPORTS.COUNTRY as PLACE ," +
							"AIRLINES.NAME AS AIRLINES," +
							"DATE_TIME," +
							"IS_ARRIVAL " + 
							"FROM FLIGHTS INNER JOIN AIRLINES ON AIRLINES.ID=FLIGHTS.AIRLINE " +
							"INNER JOIN AIRPORTS ON AIRPORTS.ID=FLIGHTS.PLACE ";
				var selectBindVariables = [];
				if(whereClause) {
					selectStatement = selectStatement + whereClause;
					if(bindVariables) {
						selectBindVariables.push(bindVariables); 
					}
				}
				connection.execute(selectStatement, selectBindVariables, {outFormat: oracledb.OBJECT}, 
					function (err, result) {
						if(err) {
							dbutil.handleError('Error in getting flight', err, response);  
						}else {
							dbutil.writeResultInResponse(result, response);
						}
					dbutil.doRelease(connection);
				});
		});
	}, //getFlights
	
	addFlightInfo: function(request, response) {
		var flightNo = request.body.flightNo;
		var place = request.body.place;
		var airlineCode = request.body.airlineCode;
		var dateTime = new Date(request.body.dateTime);
		var is_arrival = request.body.isArrival;		
		
		dbutil.handleDatabaseOperation( request, response, function (request, response, connection) {
			var insertStatement = "INSERT INTO FLIGHTS (FLIGHT_NUMBER, PLACE, AIRLINE, DATE_TIME, IS_ARRIVAL) " +
						"VALUES (:flightNo, (SELECT ID FROM AIRPORTS WHERE CODE = :place), " +
								"(SELECT ID FROM AIRLINES WHERE CODE = :airlineCode), " +
								":dateTime, :is_arrival) ";
			connection.execute(insertStatement, [flightNo, place, airlineCode, dateTime, is_arrival], 
				{outFormat: oracledb.OBJECT // Return the result as Object
				}, function (err, result) {
					if (err) {
					  dbutil.handleError('Error in insert', err, response);   
					} else {
						console.log("Add flight results :" + JSON.stringify(result));
						connection.commit(function(error){
							if(error) {
								dbutil.handleError('Error in commit', error, response);   
							} else {
								dbutil.writeResultInResponse(result, response);
							}
						});		       
					}
					dbutil.doRelease(connection);
			  }
		  );		
		});
			
	}, // addFlightInfo
	
	updateFlightInfo: function(request, response, flightNo, dateTime) {
		
		dbutil.handleDatabaseOperation( request, response, function (request, response, connection) {
			var updateStatement = "UPDATE FLIGHTS SET DATE_TIME = :dateTime WHERE FLIGHT_NUMBER = :flightNo"; 
			connection.execute(updateStatement, [dateTime, flightNo], 
				{outFormat: oracledb.OBJECT // Return the result as Object
				}, function (err, result) {
					if (err) {
					  dbutil.handleError('Error in insert', err, response);   
					} else {
						console.log("Update flight results :" + JSON.stringify(result));
						connection.commit(function(error){
							if(error) {
								dbutil.handleError('Error in commit', error, response);   
							} else {
								dbutil.writeResultInResponse(result, response);
							}
						});		       
					}
					dbutil.doRelease(connection);
			  }
		  );
		});
	}		
};