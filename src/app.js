const path = require('path')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const express = require('express');
const hbs = require('hbs');

const app = express()
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Doru Maierean'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Doru Maierean'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page with all the required info!',
        title: 'Help',
        name: 'Doru Maierean'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'Please provide address!'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    });


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: '404 Page',
        name: 'Doru Maierean'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404 Page',
        name: 'Doru Maierean'
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+port);
});