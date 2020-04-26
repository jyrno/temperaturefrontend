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

app.get("/", function(request, response) {
	response.send("Ready to serve!")
});

app.use(express.static(__dirname + '/public'));

// Could be /api/sensors/:sensor/points
app.post("/point", function(request, response) {
	console.log("POST point for " + request.body.sensor);
	const o = {
		sensor: request.body.sensor,
		ts: request.body.timestamp,
		temp: request.body.data[0].temp,
		lat: request.body.lat,
		long: request.body.long
	};

	db.none('INSERT INTO sensordata(sensor, ts, temperature, lat, long) VALUES (${sensor}, ${ts}, ${temp}, ${lat}, ${long})', o);
	response.send(request.body);
});

app.get('/api/sensors', function(request, response) {
	console.log("GET sensors");
	db.any('SELECT distinct sensor FROM sensordata ORDER BY 1', [])
		.then(function(data) {
			const sensors = [];
			data.forEach(row => sensors.push(row.sensor));
			response.json(sensors);
		});
});

app.get('/api/sensors/:sensor/points', function(request, response) {
	const sensor = request.params.sensor;
	console.log("GET points for " + sensor);
	db.any('SELECT ts date, temperature FROM (SELECT ts, temperature FROM sensordata WHERE sensor=${sensor} ORDER BY 1 DESC LIMIT 1000) x ORDER BY 1', {sensor})
		.then(function(data) {
			response.json(data);
		});
});

app.get('/api/sensors/:sensor/points/last', function(request, response) {
	const sensor = request.params.sensor;
	console.log("GET points/last for " + sensor);
	db.any('SELECT ts date, temperature FROM sensordata WHERE sensor=${sensor} ORDER BY ts DESC LIMIT 1', {sensor})
		.then(function(data) {
			response.json(data);
		});
});

// Run server on secure port 443
https.createServer(options, app).listen(443, function(){
	console.log("Let's go!")
});






