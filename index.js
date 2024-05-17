const loadingScreen = document.querySelector(".searching-container");
const locationContainer = document.querySelector(".grant-location-container");
const inputContainer = document.querySelector(".input-container");
const loadingContainer = document.querySelector(".loading-container");
const searchDataContainer = document.querySelector(".search-data-container");
const yourDataContainer = document.querySelector(".your-data-container");
const yourWeather = document.querySelector(".yourWeather");
const searchWeather = document.querySelector(".searchWeather");
const grantAccessBtn = document.querySelector(".grant-access-btn");

let userTab = locationContainer;
let tab = yourWeather;
locationContainer.classList.add("active");
yourWeather.classList.add("active");

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

let a = 0;

function switchTab(tab){
    
    if(tab == yourWeather){
        searchWeather.classList.remove("active");
        yourWeather.classList.add("active");
    }
    
    else{
        yourWeather.classList.remove("active");
        searchWeather.classList.add("active"); 
    }

}





searchWeather.addEventListener("click",() =>{
      
      if(tab!=searchWeather){
        tab = searchWeather;
        switchTab(tab);
      }

      locationContainer.classList.remove("active");
      yourDataContainer.classList.remove("active");
      inputContainer.classList.add("active");
      
});

yourWeather.addEventListener("click",() =>{
    
    if(tab!=yourWeather){
        tab = yourWeather;
        switchTab(tab);
      }

      searchDataContainer.classList.remove("active");
      inputContainer.classList.remove("active");

      if(a>=1){
        searchDataContainer.classList.add("active");
      }
      
      else{
        locationContainer.classList.add("active");
      }
});

const inputElement = inputContainer.querySelector('input');

inputElement.addEventListener("keyup", (e) => {
  // Check if Enter key was pressed
  if (e.key === "Enter") {
      // Access the value of the input element
      let cityName = inputElement.value.trim();
      
      if (cityName === "") {
        return;
      } else {
         searchWeatherinfo(cityName);
      }
  }
});


async function searchWeatherinfo(city){
      
   loadingScreen.classList.add("active");
   
   try{
     
    const response = await fetch ( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const data = await response.json();

    loadingScreen.classList.remove("active");
    searchDataContainer.classList.add("active");
    renderData(data);

   }

   catch(err){
    alert("An error occured");
    loadingScreen.classList.add("active");
    searchDataContainer.classList.remove("active");
   }
       

}

async function fetchUserWeatherInfo(userCoordinates){
  
  let {lat,lon} = userCoordinates;
  
  locationContainer.classList.remove("active");
  loadingScreen.classList.add("active");

  try{
      
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    loadingScreen.classList.remove("active");
    searchDataContainer.classList.add("active");
    renderData(data);
  }

  catch(err){
    alert("An error occured");
    loadingScreen.classList.add("active");
    yourDataContainer.classList.remove("active");
   }


}



function renderData(weatherInfo){
  
  const name = document.querySelector(".name");
  const flag = document.querySelector(".flag");
  const weatherType = document.querySelector(".weather-type");
  const weatherTypeImage = document.querySelector(".weather-type-image");
  const Temperature = document.querySelector(".temperature");
  const windspeed = document.querySelector(".windspeed-value");
  const humidity = document.querySelector(".humidity-value");
  const cloudiness = document.querySelector(".cloud-value");


  name.innerText = weatherInfo?.name;
  flag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  weatherType.innerText = weatherInfo?.weather?.[0]?.description;
  weatherTypeImage.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  Temperature.innerText = `${weatherInfo?.main?.temp} °C`;
  windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
  

}

function getLocation() {
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
      //HW - show an alert for no gelolocation support available
      console.log("cannot get the location");
  }
}

function showPosition(position){
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  }

  
  
  fetchUserWeatherInfo(userCoordinates);
}

grantAccessBtn.addEventListener("click",getLocation);












