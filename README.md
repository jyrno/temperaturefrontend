# Data API

1. Install Node.js.
2. Clone this repository.
3. Run `npm install` in the repository's directory.
4. Start the data API server using `node server.js`.
5. Open browser to see the graph `http://localhost:8081/`

## REST API 

/api/create
Creates database

/api/add?sensor=Sensor1&value=14.96
Adds new measurement value with current date

/api/points
Retrieve all measurement points
