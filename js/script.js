//variables and element selections

const apiKey = "fd73a31465a64424b887ac48a298597e"
const apiCountryURL = "https://flagsapi.com/"
const imageApiKey = "&client_id=iZT5EqU8n65t5NCUrJzsvuLHDgZd1-TD25mlOlYpf3s"
const templateImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"



const loading = document.createElement("div")

const cityList = [
    "Tóquio",
    "Nova York",
    "Londres",
    "Sydney",
    "Cairo",
    "São Paulo",
    "Toronto",
    "Berlim",
    "Bangkok",
    "Cidade do Cabo"
];  

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search")



const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const folderContainer = document.querySelector(".container")
const dataContainer = document.querySelector("#weather-data")
const cityContainer = document.querySelector("#city-suggestion")

//functions

const getWeatherData = async (city) => {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
        
        const res = await fetch(apiWeatherURL)
        const data = await res.json()
        
        return data
    }
    
    const getImage = async (city) =>{
        const imageApiUrl = `https://api.unsplash.com/search/photos?per_page=1&orientation=landscape&query=${city}${imageApiKey}`
        
        const imageRes = await fetch(imageApiUrl)
        const imageData = await imageRes.json()
        
        return imageData
    }

    const showWeatherData = async (city) =>{
        console.log(getImage(city))
        const bgImage = await getImage(city)
        const data = await getWeatherData(city)
        console.log(data)

        if(data.cod == "200"){
            cityContainer.style.display = "none"
            loading.style.display = "none"
            
            cityElement.innerText = data.name
            //tempElement.innerText = parseInt(data.main.temp)
            tempElement.innerText = Math.trunc(data.main.temp)
            descElement.innerHTML = data.weather[0].description
            weatherIconElement.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
            humidityElement.innerText = `${data.main.humidity}%`
            windElement.innerText = `${data.wind.speed}km/h`
            countryElement.setAttribute('src',apiCountryURL+data.sys.country+"/flat/64.png")
            if(bgImage.total == 0){
                document.body.style.backgroundImage = `url('${templateImg}')`
            }else{
                document.body.style.backgroundImage = `url('${bgImage.results[0].urls.full}')`
            }
        }else if(data.cod == "404"){
            dataContainer.innerText = "Cidade não encontrada, tente novamente"    
            loading.style.display = "none"
        }else{
            dataContainer.innerText = `Erro: ${data.cod}, tente recarregar a página`    
            loading.style.display = "none"
        }
        dataContainer.style.display = "block"
        
        // try{
        // }catch(err){
        //     console.log(err)
        //     dataContainer.innerText = "Erro desconhecido, recarregue a página"    
        // }
    }

    const citySuggestions = () => {
        for(city in cityList){
            const cityBtn = document.createElement("button")
            cityBtn.setAttribute("id","city-button")
            
            cityBtn.addEventListener("click", (e) =>{
                e.preventDefault();
                const city = cityBtn.textContent
                cityContainer.style.display = "none"
            
                showLoading(city)
            })

            cityBtn.innerText = cityList[city]
            cityContainer.appendChild(cityBtn)
        }
    }
    const showLoading = (city) =>{
        if(cityContainer.style.display != "none"){
            cityContainer.style.display = "none"
        }else{
            dataContainer.style.display = "none"
        }
        loading.setAttribute("id","loading")
        loading.innerHTML = "Carregando..."
        folderContainer.appendChild(loading)
        loading.style.display = "block"
        
        setTimeout(()=>showWeatherData(city),2000)
    }

//events

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = cityInput.value
    showLoading(city)
  //  showWeatherData(city)
})


cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value

        showLoading(city)
    }
})