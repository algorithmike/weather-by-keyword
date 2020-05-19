const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000 // Heroku port || 3000

// Define paths for Express config
const dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handle Bars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up Static directory to serve
app.use(express.static(dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'An search address is required.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) return res.send({error})

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError) return res.send({error: forecastError})
            
            return res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })
        })
    });
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: 'Help error',
        name: 'Mike',
        message: 'Help topic not found.'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Mike',
        message: 'Page not found.'
    })
})

app.listen(port,() => {
    console.log(`Server is on port ${port}`)
})