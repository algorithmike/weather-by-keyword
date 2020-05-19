const request = require('request')
require('dotenv').config()

const forecast = (x, y, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${encodeURIComponent(x)},${encodeURIComponent(y)}`;

    request({url, json: true}, (error, {body: data}) => {
        if (error) {
            callback("Low level Darksky error.", undefined);
        } else if (data.error){
            callback("High level Darksky error.", undefined);
        } else {
            callback(undefined, data.daily.data[0].summary);
        }
    })
}

module.exports = forecast