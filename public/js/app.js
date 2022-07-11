console.log("Client side js")
const form =  document.querySelector("form");

function get_weather(){
    document.getElementById("data").classList.add("d-none")
    Swal.fire({
        title: 'Please Wait !',
        html: 'Fetching',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        },
    });
    var location = document.getElementById("location").value

    fetch("/weather?address="+location).then((response) =>{
        response.json().then((data)=>{
            swal.close()
            if(data.error){
                Swal.fire({
                    title: 'Error',
                    text: data.error,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
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
                var w_d  = weather_description
                if (w_d == "Mist"){
                    w_d = "Haze"
                }
                if(is_day == "yes" || w_d == "Haze"){
                    document.getElementById("dynamic_icon").innerHTML = '<i class="wi wi-day-'+w_d.toLowerCase().replace(' ', '-')+' text-black" style="font-size:96px !important;"></i>'
                } else{
                    document.getElementById("dynamic_icon").innerHTML = '<i class="wi wi-night-'+w_d.toLowerCase().replace(' ', '-')+' text-black" style="font-size:96px !important;"></i>'
                }

                document.getElementById("data").classList.remove("d-none")
            }
        })
    })
}