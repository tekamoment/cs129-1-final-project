// 1) Convert coordinates from supplied json to expected format (lon/lat instead of lat/lon)
db.uberData.aggregate(
    [
        {
            $project: {
                date_time: 1,
                base: 1,
                location: {
                    type: "Point",
                    coordinates: { $reverseArray: "$coordinates" }
                }
            }
        },
        {
            $project: {
                coordinates: 0
            }
        },
        {
            $out: "uberData.converted"
        }
    ]
)

// 2) Assign borough ids to all trips based on uberData location
db.boroughs.find().forEach((doc) => {
    let boroughID = doc.properties.boro_code

    let countInBorough = db.uberData.converted.find({
        location: {
            $geoWithin: {
                $geometry: doc.geometry
            }
        }
    }).forEach((dataInBorough) => {
        db.uberData.converted.update(
            { _id: dataInBorough._id },
            { $set : {borough_code: boroughID}}
            )
        })
})

// 3) If no borough_code assigned, set default (0)
db.uberData.converted.update(
    { borough_code: { $exists: false }},
    { $set: {borough_code: 0}},
    { multi: true }
)


deriveHourFromDate = function(dateString) {
    // input: "4/1/2014 0:11:00"
    // return: 0
    let matches = dateString.match(/ (\d+):/)
    return matches[1]
}

// save so the system can actually reference the function
db.system.js.save({
    _id: 'deriveHourFromDate',
    value: deriveHourFromDate
})

uberDataHourMap = function() {
    emit({
        hour: deriveHourFromDate(this.date_time),
        borough: this.borough_code
    }, 
    {
        count: 1,
        points: [{
          type: "Point",
          coordinates: this.coordinates
        }]
    })
}

uberDataHourReduce = function(key, values) {
    return {
        count: values.reduce((sum, value) => sum + value.count, 0),
        points: values.reduce((sum, value) => sum.concat(value.points), [])
    }
}

uberDataHourResults = db.runCommand({
    mapReduce: 'uberData.converted',
    map: uberDataHourMap,
    reduce: uberDataHourReduce,
    out: 'uberData.HourMapped'
})

