const request = require('postman-request');

/*
Inputs: 
• city: location, address
• callback: (error, response) => {
    error: string
    response: {
        latitude: number,
        longitude: number,
        location: string
    }
}
*/

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9f07ed141ab4bfe28e43ea1afee800af&query=${longitude},${latitude}`
    
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is currently ${response.body.current.temperature}˚. It feels like ${response.body.current.feelslike}˚.`);
        }
    })
}


module.exports = forecast;