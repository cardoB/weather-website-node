const express = require('express');
// Built-in module for manipulating path strings
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console shortcut
const log = console.log;


const app = express();
const port = process.env.PORT || 3000;

// creating a string conaining the path to ../public/index.html
const publicDirectoryPath = path.join(__dirname, '../public');

// path to handlebars/template
const viewsPath = path.join(__dirname, '../templates/views');

const partialspath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialspath);

// Tell app to use handlebar engine
app.set('view engine', 'hbs');

// Tell app where to find templates
app.set('views', viewsPath);

// Set up static directory to serve: html,css, js file that do not change. 
app.use(express.static(publicDirectoryPath));


/*
    Domain:
    app.com

    Routes:
    app.com/help
    app.com/about
    app.com/user1

    */

/* 
Query strings example
query strings are at the end of url. form:
/products?x=val-one&y=val-two
*/

app.get('/products', (req, res) => {
    console.log('Query:', req.query.x);
    console.log('Query:', req.query.y);
    if (!req.query.x) {
        return res.send({
            error: 'You must provide a queryy'
        })
    }
    res.send({
        products: []
    });
});

// weather route
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    let address = req.query.address;

    // let data1;
    // let data2;
    // // Call to geocode API:
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        // Call to weather API
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            // return { location: location, forecastData: forecast };
            return res.send(
                {
                    forecast: forecastData,
                    location,
                    address: req.query.address
                }
            );
        })
    })

});


// Home route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'CardoB'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'CardoB'
    })
});


app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'CardoB'
    })
});

// Must be after help get, if it finds a match before this get call, it will process that one.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'CardoB',
        errorMessage: 'Help page not found'
    })
})

// Must be last, if it finds a match before this get call, it will process that one.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'CardoB',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// https://bell-weather-application-c14dfa27df6c.herokuapp.com/
