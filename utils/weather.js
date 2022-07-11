const request = require('postman-request')

const getWeather = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8ce89b03f556c1832206c764375ca30d&type=city&query="+location
    request(url, (error, response, body) =>{
    if (!error && response != undefined && response.statusCode == 200){
        const dataJSON = JSON.parse(body)
        if(dataJSON.success){
            const current = dataJSON.current
            const return_data = {
                "location" : dataJSON.location.name + ", " + dataJSON.location.country,
                "current_temperature": current.temperature,
                "feels_like": current.feelslike,
                "wind_speed": current.humidity,
                "humidity": current.humidity,
                "cloud_cover": current.cloudcover,
                "weather_description": current.weather_descriptions[0],
                "is_day": current.is_day,
            }
            callback(undefined, return_data)
        }
        else{
            callback(dataJSON.error.info, undefined)
        }
    } else{
        callback(error.message, undefined)
    }
    })
}

module.exports = getWeather