# CS129.1 Final Project
First Semester, AY 2017–2018

Arcenas, De Guzman, Seechung, Tiongson

## INSTRUCTIONS:

### Setting up JSON files
Ensure that the files:
"/borough_boundaries.geojson"
and
"/uber-raw-data-apr14.json"
(both found in "/Used data")
are inside "/mongo".

### Running mongo image:
Pull official mongo image (NOT pitzcarraldo) and run inside /mongo.

`docker run --rm --name mongo -p 27017:27017 -p 28017:28017 -v "$(pwd)"/db:/data/db -v "$(pwd)":/data/seeds -d mongo --httpinterface`
(Instructions vary based on OS.)

### Importing JSON to mongo:

Assuming you ran the container as 'mongo', run the following inside the image's interactive terminal (e.g. docker run -it mongo)

`mongoimport --db ted --collection boroughs --type json --file /data/seeds/borough_boundaries.geojson`

`mongoimport --db ted --collection uberData --type json /data/seeds/uber-raw-data-apr14.json`

### Replicate sets:
Copy and paste the docker-compose.yml file on the root project folder

On the cmd promt, navigate to the project folder

Start services
docker-compose up

Use another cmd to login to "mongosetup"
docker-compose run mongosetup sh

Login to "mongo1"
mongo --host mongo1:27017 uber

Setup the configuration for the replica set
var cfg = {
	"_id": "uber",
	"version": 1,
	"members": [
		{
			"_id": 0,
			"host": "mongo1:27017",
			"priority": 1
		},
		{
			"_id": 1,
			"host": "mongo2:27017",
			"priority": 0
		},
		{
			"_id": 2,
			"host": "mongo3:27017",
			"priority": 0
		}
	]
};

Initiate the replica set using the configuration
rs.initiate(cfg);

After iniiating, set and find the reading preference to the nearest node
db.getMongo().setReadPref('nearest');

Test replicates

### Running MapReduce:
Run the commands included inside `UberDataMapReduce.js`.


### Setting up sharding:
