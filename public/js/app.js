console.log("Client side js")
const form =  document.querySelector("form");

function get_weather(){
    document.getElementById("data").classList.add("d-none")
    Swal.fire({
        title: 'Please Wait !',
        html: 'Fetching',// add html attribute if you want or remove
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
    });
    var location = document.getElementById("location").value

    fetch("http://localhost:3000/weather?address="+location).then((response) =>{
        response.json().then((data)=>{
            swal.close()
            if(data.error){
                console.log(data.error)
            }
            else{
                const {location, current_temperature, feels_like, humidity, wind_speed, cloud_cover, weather_description, is_day} = data.forecast
                document.getElementById("res_location").innerText = location
                document.getElementById("current_temp").innerHTML = current_temperature + "&deg;C"
                document.getElementById("feels_like").innerHTML = feels_like + "&deg;C"
                document.getElementById("humidity").innerHTML = humidity + "%"
                document.getElementById("wind_speed").innerHTML = wind_speed + "km/h"
                document.getElementById("cloud_cover").innerHTML = cloud_cover + "%"
                document.getElementById("description").innerHTML = weather_description
                if (weather_description == "Mist"){
                    weather_description = "Haze"
                }
                if(is_day == "yes" || weather_description == "Haze"){
                    document.getElementById("dynamic_icon").innerHTML = '<i class="wi wi-day-'+weather_description.toLowerCase().replace(' ', '-')+' text-black" style="font-size:96px !important;"></i>'
                } else{
                    document.getElementById("dynamic_icon").innerHTML = '<i class="wi wi-night-'+weather_description.toLowerCase().replace(' ', '-')+' text-black" style="font-size:96px !important;"></i>'
                }

                document.getElementById("data").classList.remove("d-none")
            }
        })
    })
}