// Data API

var express = require("express");
var app = express();

app.get('server/points', function(request, result) {
	console.log("Placeholder GET server/points");
});

app.get('server/point/last', function(request, result) {
	console.log("Placeholder GET server/point/last");
});

app.put('server/point', function(request, result) {
	console.log("Placeholder PUT server/point");
});

var server = app.listen(8081, function() {
	console.log("Töötan!");
}); 
