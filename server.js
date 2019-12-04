// Imports
const express = require("express");
const pgp = require("pg-promise")(/*options*/);

// Setup database connection
const connection = {
	host : 'localhost',
	port: 5432,
	database: process.env.DBNAME || 'sensorio',
	user: process.env.DBUSER || 'sensorio',
	password: process.env.DBPASS || ''
};
const db = pgp(connection);

// Define data API endpoints
app = express();
app.use(express.json());

app.get("/", function(request, result){
	result.send("Ready to serve!")
});

app.get('/points', function(request, result) {
	console.log("Placeholder GET points");
	result.send("Queried points");
});

app.get('/points/last', function(request, result) {
	console.log("Placeholder GET points/last");
});

app.put('/point', function(request, result) {
	console.log("Placeholder PUT /point");
});

server = app.listen(8081, function() {
	console.log("Ready to serve!");
}); 
