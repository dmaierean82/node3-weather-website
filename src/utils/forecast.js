const request = require('request');
const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/491c37206b6a196a09063c9a01633b26/'+latitude+','+longitude +'?units=si'

    request({ url, json: true } , (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.There is a '+ body.currently.precipProbability + '% chance of rain.It will be a min temperature of ' +body.daily.data[0].temperatureMin+ 'degrees and a max temp of '+ body.daily.data[0].temperatureMax);
        }
    })
}

module.exports = forecast