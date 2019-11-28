# Data API

1. Install Node.js.
2. Clone this repository.
3. Run `npm install` in the repository's directory.
4. Start the data API server using `node server.js`.
5. Open browser to see the graph `http://localhost:8081/`
  You can specify sensors in query parameters `http://localhost:8081/?sensor=Sensor1&sensor=Sensor2`

## REST API 

/api/create
Creates database

/api/sensors/:sensor/points/add/:value
Adds new measurement value with current date

/api/sensors/:sensor/points
Retrieve measurement points for sensor

/api/points
Retrieve all measurement points
