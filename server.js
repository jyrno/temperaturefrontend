const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('data.db');

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/api/create', function(request, result) {
	db.run('CREATE TABLE measurement(sensor text, date text, value double)');
	result.send("Andmebaas loodud");
});

app.get('/api/sensors/:sensor/points', function(request, result) {
	const sensor = request.params.sensor;
	db.all('SELECT date, value temperature FROM measurement WHERE sensor=? ORDER BY date', [sensor], (err, rows) => {
		result.send(rows);
	});
});

app.get('/api/points', function(request, result) {
	let sensors = request.query.sensor;
	let sql;
	if (sensors) {
		if (Array.isArray(sensors)) {
			sql = 'SELECT sensor, date, value FROM measurement WHERE sensor IN (' + sensors.map(x => '?').join(',') + ') ORDER BY date';
		} else {
			sql = 'SELECT sensor, date, value FROM measurement WHERE sensor = ? ORDER BY date';
			sensors = [sensors];
		}
	} else {
		sql = 'SELECT sensor, date, value FROM measurement ORDER BY date';
		sensors = [];
	}
	const series = [];
	db.all(sql, sensors, (err, rows) => {
		rows.forEach(row => {
			const elm = {date: row.date};
			elm[row.sensor] = row.value;
			series.push(elm);
		});
		result.send(series);
	});
});

app.get('/api/sensors/:sensor/points/add/:value', function(request, result) {
	const sensor = request.params.sensor;
	const date = new Date().toJSON();
	const value = request.params.value;
	db.run('INSERT INTO measurement(sensor, date, value) VALUES(?, ?, ?)', [sensor, date, value], function(err) {
		result.send("Lisatud kirje");
	});
});

var server = app.listen(8081, function() {
	console.log("Server töötab");
}); 
