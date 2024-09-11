//variables and element selections

const apiKey = "fd73a31465a64424b887ac48a298597e"
const apiCountryURL = "https://flagsapi.com/"

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search")

const dataElement = document.querySelector("#weather-data")
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

//functions

    const getWeatherData = async (city) => {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

        const res = await fetch(apiWeatherURL)
        const data = await res.json()
        
        return data
    }

    const showWeatherData = async (city) =>{
        const data = await getWeatherData(city)
        console.log(data)

        cityElement.innerText = data.name
        //tempElement.innerText = parseInt(data.main.temp)
        tempElement.innerText = Math.trunc(data.main.temp)
        descElement.innerHTML = data.weather[0].description
        weatherIconElement.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        humidityElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed}km/h`
        countryElement.setAttribute('src',apiCountryURL+data.sys.country+"/flat/64.png")
    }

//events

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = cityInput.value
    
    dataElement.style.display = "block"

    showWeatherData(city)
})