const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('data.db');

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/api/create', function(request, result) {
	db.run('CREATE TABLE sensordata(sensor text, ts text, temperature double, lat string, long string)');
	result.send("Andmebaas loodud");
});

app.get('/api/points/dummy', function(request, result) {
	result.send([
		{date: "2019-10-11T00:01:01Z", temperature: 23},
		{date: "2019-10-11T01:05:01Z", temperature: 25},
		{date: "2019-10-11T01:25:01Z", temperature: 28},
		{date: "2019-10-11T02:11:01Z", temperature: 24},
		{date: "2019-10-11T22:17:01Z", temperature: 23.8},
		{date: "2019-10-12T02:10:00Z", temperature: 22.1},
	]);
});

app.get('/api/sensors', function(request, result) {
	db.all('***', [], (err, rows) => {
		const sensors = [];
		rows.forEach(row => sensors.push(row.sensor));
		result.send(sensors);
	});
});

app.get('/api/sensors/:sensor/points', function(request, result) {
	const sensor = request.params.sensor;
	db.all('***', [sensor], (err, rows) => {
		result.send(rows);
	});
});

app.get('/api/points', function(request, result) {
	db.all('SELECT * FROM sensordata ORDER BY 1', [], (err, rows) => {
		result.send(rows);
	});
});

app.get('/api/sensors/:sensor/points/add/:value', function(request, result) {
	const sensor = request.params.sensor;
	const date = new Date().toJSON();
	const value = request.params.value;
	db.run('INSERT INTO sensordata(sensor, ts, temperature) VALUES(?, ?, ?)', [sensor, date, value], function(err) {
		result.send("Lisatud kirje");
	});
});

var server = app.listen(8081, function() {
	console.log("Server töötab");
}); 
