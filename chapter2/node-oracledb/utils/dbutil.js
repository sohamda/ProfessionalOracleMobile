
var oracledb = require('oracledb'); 

module.exports = {

handleDatabaseOperation: function( request, response, callback) {
  console.log(request.method + ":" + request.url );
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  
  console.log('Handle request: '+request.url);
  createConnection(function(err, connection) {
    if (err) {
	  console.log('Error in acquiring connection ...');
	  console.log('Error message '+err.message);
      // Error connecting to DB
      handleError(request, err, response);
      return;
    }        
    // do with the connection whatever was supposed to be done
	console.log('Connection acquired ; go execute ');
	callback(request, response, connection);
 });
}, //handleDatabaseOperation

doRelease: function(connection) {
  connection.release(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
},

createConnectionPool: function(poolName) {
  oracledb.createPool({
    poolAlias: poolName,
	user : process.env.DBAAS_USER_NAME || "AIRPORT",
    password: process.env.DBAAS_USER_PASSWORD || "buildingAPIs",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "129.144.152.150:1521/PDB1.partnercloud17.oraclecloud.internal"
  }, function(err, pool) {
	  if(err) {
		 console.error(err.message);
	  }
  });
},

handleError: function(message, err, response) {
	response.writeHead(500, {'Content-Type': 'application/json'});
	response.end(JSON.stringify({status: 500,
					message: message,
					detailed_message: err.message
	 }));
},

writeResultInResponse: function(result, response) {
	response.writeHead(200, {'Content-Type': 'application/json'});					
	response.end(JSON.stringify({operation :"successful", result : result}));
}

};

var createConnection = function(callback) {
  oracledb.getConnection({
    user          : process.env.DBAAS_USER_NAME || "AIRPORT",
    password      : process.env.DBAAS_USER_PASSWORD || "Welcome1#",
    connectString : process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "129.144.152.150:1521/PDB1.partnercloud17.oraclecloud.internal"
  }, function(err, connection) {
		callback(err, connection);
  });
};