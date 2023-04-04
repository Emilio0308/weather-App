import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

function App() {
  const [newCity, setNewCity] = useState()
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [bg, setBg] = useState()
  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };
    setCoords(currentCoords);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=282d567b73c622bd33454284d9cbad6c`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data)
          setBg(res.data.weather[0].main)
        })
        .catch((err) => {console.log(err);});
    }
  }, [coords]);

  const handleSearchCity = (e) =>{
    e.preventDefault()
    let city = e.target.city.value
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=282d567b73c622bd33454284d9cbad6c`
    axios.get(url)
    .then((res)=> {
      setNewCity({lat: res.data[0].lat, long:res.data[0].lon})
    })
    .catch((err)=>{console.log(err)})
  }
  useEffect(() => {
    if (newCity) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${newCity.lat}&lon=${newCity.long}&appid=282d567b73c622bd33454284d9cbad6c`;
      axios
        .get(url)
        .then((response) => {setWeather(response.data)
          setBg(response.data.weather[0].main)
        })
        .catch((err) => {console.log(err);});
    }
  }, [newCity]);

  const background= {
    "Clear" : "/img/bg/clearSky.jpg",
    "Clouds" : "/img/bg/fewClouds.jpg",
    "Mist" : "/img/bg/mist.jpg",
    "Snow" : "/img/bg/snow.jpg",
    "Rain" : "/img/bg/rain.jpg",
    "Drizzle" : "/img/bg/Drizzle.jpg",
    "Thunderstorm" : "/img/bg/thunderstorm.jpg",
  }
  console.log(background[bg])
  return (

    <div  className={`App  min-h-screen`} style={{backgroundImage: `url(${background[bg]})`}}>
      <img src={`${background[bg]}`} alt="" loading="lazy" className="hidden"></img>
      <form onSubmit={handleSearchCity} className="flex gap-1 mb-20 sm:min-w-[450px] " >
        <input className="text-2xl rounded-lg" placeholder="Search a city" type="text" id="city" />
        <button className="text-2xl">Search</button>
      </form>
      {weather? <Weather weather={weather} temp={weather.main.temp}></Weather>
                :<Loader></Loader>
      }
    </div> 
  );
}
export default App;


