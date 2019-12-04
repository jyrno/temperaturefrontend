// Data API

var express = require("express");
var app = express();

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

var server = app.listen(8081, function() {
	console.log("Töötan!");
}); 
