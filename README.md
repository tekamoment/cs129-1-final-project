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


### Running MapReduce:
Run the commands included inside `UberDataMapReduce.js`.


### Setting up sharding:
