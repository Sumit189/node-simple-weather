const express = require('express')
const hbs = require('hbs')
const path = require('path')
// const geocode = require('../utils/geocode')
const getWeather = require('../utils/weather')

const static_dir = (path.join(__dirname,'../public'))
const views_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(static_dir))
app.set('view engine','hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sumit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Sumit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        faqs: [
            {
                ques: "Ques1",
                ans: "Ans1"
            }, 
            {
                ques: "Ques2",
                ans: "Ans2"
            }
        ],
    })
})
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "Location needed"
        })
    } 

    getWeather(req.query.address,(error, data) => {
        if (error){
            res.send({
                error: error
            })
        }
        res.send({
            forecast: data
        })
    })
    
    // geocode(req.query.address, (error, {latitude, longitude})=>{
    //     if (error){
    //         return res.send({error})
    //     }
    //     const location = latitude+","+longitude
        
    // })
})
    

app.get('*', (req, res) =>{
    res.send("404")
})

app.get('*/*', (req, res) =>{
    res.send("404")
})
app.listen(port, () =>{
    console.log("Started at port: "+port)
})