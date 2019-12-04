// Imports
const fs = require("fs");
const https = require("https");
const pgp = require("pg-promise")(/*options*/);
const express = require("express");

// Setup options for HTTPS
const basePath = '/etc/letsencrypt/live/sensorio.ml';
var options = {
	key: fs.readFileSync(`${basePath}/privkey.pem`),
	cert: fs.readFileSync(`${basePath}/fullchain.pem`)
};

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

app.get('/api/points', function(request, result) {
	console.log("Placeholder GET points");
	db.any('SELECT ts date, temperature FROM sensordata ORDER BY 1', [])
			.then(function(data) {
					response.json(data);
			});
});

app.get('/api/points/last', function(request, result) {
	console.log("Placeholder GET points/last");
	db.any('SELECT ts date, temperature FROM sensordata ORDER BY ts DESC LIMIT 1', [])
			.then(function(data) {
					response.json(data);
			});
});

app.post("/api/point", function(request, result){
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

app.use(express.static(__dirname + '/public'));

// Run server on secure port 443
https.createServer(options, app).listen(443, function(){
	console.log("Let's go!")
});
