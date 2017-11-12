
var oracledb = require('oracledb'); 
var dbutil = require('./utils/dbutil'); 

module.exports = {
	
	getAllFlights: function(request, response) {
		console.log('called');
		getFlights(request, response, '', '');
	}, //getAllUsers
	
	getFlights: function(request, response, whereClause, bindVariables) {
		dbutil.handleDatabaseOperation( request, response, 
			function (request, response, connection) {
				var selectStatement = "SELECT FLIGHT_NUMBER, PLACE, AIRLINE_CODE, DATE_TIME, IS_ARRIVAL FROM FLIGHTS ";
				var selectBindVariables = [];
				if(whereClause) {
					selectStatement = selectStatement + whereClause;
					if(bindVariables) {
						selectBindVariables.push(bindVariables); 
					}
				}
				connection.execute(selectStatement, selectBindVariables, {outFormat: oracledb.OBJECT}, 
									function (err, result) {
										if (err) {
											handleError('Error in getting flight', err, response);  
										} else {
											writeResultInResponse(result, response);
										}
					dbutil.doRelease(connection);
				});
		});
	}

		
};