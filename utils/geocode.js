const request = require('postman-request')


const geocode  = (address, callback) =>{
    const location_api = "http://api.positionstack.com/v1/forward?access_key=7c9dc194b7b689a0ec71cc9792782bb4&query="+address
    request(location_api, (error, response, body) =>{
        if(error){
            callback(error.message, undefined)
        }  
        else if(response.body.length == 0){
            callback("Unable to Find Location", undefined)
        }
        else{
            const responseJSON = JSON.parse(body)
            callback(undefined, {
                latitude: responseJSON.data[0].latitude,
                longitude: responseJSON.data[0].longitude,
            })
        }
    })
}

module.exports = geocode
