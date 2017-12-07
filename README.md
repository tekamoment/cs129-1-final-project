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

### Replicate sets:
Copy and paste the docker-compose.yml found in the Replicaion confi folder on the root project folder

On the command prompt, navigate to the project folder.

Start services: `docker-compose up`

Use another command line interface to login to "mongosetup": `docker-compose run mongosetup sh`

Login to "mongo1": `mongo --host mongo1:27017 uber`

Setup the configuration for the replica set: 
`var cfg = {
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
};`

Initiate the replica set using the configuration: `rs.initiate(cfg);`

After iniiating, set and find the reading preference to the nearest node: `db.getMongo().setReadPref('nearest');`

Test replicates

### Importing JSON to mongo:

Copy both the `borough_boundaries.geojson` and `uber-raw-data-apr14.json` files to the container hosting the Mongo setup: i.e. `mongoreplicates_mongosetup_[number]`

`docker cp borough_boundaries.geojson [mongoreplicates_mongosetup_run]:/data/borough_boundaries.geojson`
`docker cp uber-raw-data-apr14.jsonmo [mongoreplicates_mongosetup_run]:/data/uber-raw-data-apr14.json`

Assuming you ran the container as 'mongo', run the following inside the image's interactive terminal (e.g. docker run -it mongo)

`mongoimport --db ted --collection boroughs --type json --file /data/seeds/borough_boundaries.geojson`

`mongoimport --db ted --collection uberData --type json /data/seeds/uber-raw-data-apr14.json`

### Running MapReduce:
Run the commands included inside `UberDataMapReduce.js`.

### Setting up sharding:

Copy and paste the docker-compose.yml found in the Replicaion confi folder on the root project folder

Start services: docker-compose up

Use another cmd to login to "mongosetup": docker-compose run mongosetup sh

Login to "mongosetup": docker-compose run mongosetup sh

Login to "mongos": mongo mongos1:27017/book

Add nodes to the sharding set: db.adminCommand( { addshard : "node1:27017" } ), db.adminCommand( { addshard : "node2:27017" } )

Enable sharding for a database: db.adminCommand( { enablesharding : "book" } )

Check if sharding is successful: db.adminCommand( { listshards : 1 } );
