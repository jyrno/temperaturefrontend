const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('data.db');

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/api/create', function(request, result) {
	db.run('CREATE TABLE measurement(sensor text, date text, value double)');
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

app.get('/api/points', function(request, result) {
	db.all('SELECT date, value temperature FROM measurement ORDER BY date', [], (err, rows) => {
		result.send(rows);
	});
});

app.get('/api/add', function(request, result) {
	const sensor = request.query.sensor;
	const date = new Date().toJSON();
	const value = request.query.value;
	db.run('INSERT INTO measurement(sensor, date, value) VALUES(?, ?, ?)', [sensor, date, value], function(err) {
		result.send("Lisatud kirje");
	});
});

var server = app.listen(8081, function() {
	console.log("Server töötab");
}); 
