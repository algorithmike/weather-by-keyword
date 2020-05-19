const request = require('request')

const forecast = (x, y, callback) => {
    const url = `https://api.darksky.net/forecast/c4298c5590d0d16c1828c0e8f676daf8/${encodeURIComponent(x)},${encodeURIComponent(y)}`;

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