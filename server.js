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
	db.any('SELECT ts date, temperature FROM sensordata ORDER BY 1', [])
			.then(function(data) {
					response.json(data);
			});
});

app.get('/points/last', function(request, result) {
	console.log("Placeholder GET points/last");
	db.any('SELECT ts date, temperature FROM sensordata ORDER BY ts DESC', [])
			.then(function(data) {
					response.json(data[0]);
			});
});

app.post("/point", function(request, result){
	o = {
		sensor: request.body.sensor,
		ts: request.body.timestamp,
		temp: request.body.data[0].temp,
		lat: request.body.lat,
		long: request.body.long
	};

	db.none('INSERT INTO sensordata(sensor, ts, temperature, lat, long) VALUES (${sensor}, ${ts}, ${temp}, ${lat}, ${long})', o);
	result.send(request.body);
});

server = app.listen(8081, function() {
	console.log("Ready to serve!");
}); 
