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
const geocode = (city, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(city)}&access_token=pk.eyJ1IjoiY2FyZG9iIiwiYSI6ImNsdnF6OWQ2cDBhd2Eya29ic2FvcThlZHoifQ.7fe9OciLNOQo767oL7QhLQ`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to access geolocation service!', undefined);
        } else if (response.body.error_code === "VALIDATION_ERROR") {
            callback('Unable to find coordinates.', undefined);

        } else if (response.body.error_code === 'NO_TOKEN') {
            callback('Wrong API token.', undefined);

        } else if (response.body.features.length === 0) {
            callback('Unable to find coordinates.', undefined);
        } else {

            callback(undefined, {
                longitude: response.body.features[0].geometry.coordinates[0],
                latitude: response.body.features[0].geometry.coordinates[1],
                location: response.body.features[0].properties.full_address
            });
        }
    })
}


module.exports = geocode;