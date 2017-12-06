INSTRUCTIONS:

Ensure that the files:
"/borough_boundaries.geojson"
and
"/uber-raw-data-apr14.json"
(both found in "/Used data")
are inside "/mongo/".

Pull official mongo image (NOT pitzcarraldo) and run inside /mongo.
(Instructions vary based on OS.)

Assuming you ran the container as 'mongo', run the following inside the image's interactive terminal (e.g. docker run -it mongo)

mongoimport --db ted --collection boroughs --type json --file /data/seeds/borough_boundaries.geojson

mongoimport --db ted --collection uberData --type json /data/seeds/uber-raw-data-apr14.json

Then run the code inside the JS file.