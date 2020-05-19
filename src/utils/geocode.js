const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxnb3JpdGhtaWtlIiwiYSI6ImNrN21scnMweDA0Zm8zbHE4bjg1dGJ5MzIifQ.yZoPy-Vb_PiX45SSdOHCBw&limit=1'

    request({url, json: true}, (error, {body: data}) => {
        if (error) {
            callback('Low level error with MapBox request.', undefined);
        } else if (data.features.length === 0) {
            callback('High level error with MapBox request.', undefined);
        } else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            })
        }
    })
}

module.exports = geocode