import React, { useEffect, useState } from "react";
import "./weather.css";
import GetTime from "./GetTime";

const Wheater = ({ weather , temp }) => {
  const [temperature, setTemperature] = useState([(temp-273.15), `C`])
  const handleChangeUnit = () => {
    temperature[1] == `C`
      ? setTemperature([(temperature[0] * 9) / 5 + 32, `F`])
      : setTemperature([((temperature[0] - 32) * 5) / 9, `C`]);
  };
  useEffect(() => {
    setTemperature([(temp-273.15), `C`])
  }, [temp])
  
  return (
    <section className="weatherContainer flex flex-col gap-5 items-center p-1  rounded-xl">
      <h1 className="text-center text-5xl z-40">{weather.name}-{weather.sys.country}</h1>
      {weather? <GetTime city ={weather.name} inicio={weather.sys.sunrise} fin={weather.sys.sunset} zona={weather.timezone} />: <Loader></Loader>}
      <section className="flex flex-col gap-5 sm:flex-row">
        <article className="bg-blue-900/50 p-5 rounded-xl backdrop-blur-[5px] sm:min-w-[450px]">
          <h3 className="capitalize text-center text-xl my-4">
            {weather.weather[0].description}
          </h3>
          <div className="flex gap-10 items-center justify-center">
            <span className="text-5xl">{`${temperature[0].toFixed(1)}° ${
              temperature[1]
            }`}</span>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          </div>
        </article>
        <article className="seconArticle flex justify-around gap-2 rounded-xl overflow-hidden sm:flex-col">
          <div className="bg-blue-900/[0.5] flex-1 flex sm:w-[90px] backdrop-blur-sm">
            <div>{weather.wind.speed}</div>
            <img src={`/img/wind.png`} alt="" />
          </div>
          <div className="bg-blue-900/[0.5] flex-1 flex sm:w-[90px] backdrop-blur-sm">
            <div>{weather.main.pressure}</div>
            <img src={`/img/pressure.png`} alt="" />
          </div>
          <div className="bg-blue-900/[0.5] flex-1 flex sm:w-[90px] backdrop-blur-sm">
            <div>{weather.main.humidity}</div>
            <img src={`/img/humidity.png`} alt="" />
          </div>
        </article>
      </section>
      <button  className="p-2 bg-blue-900 rounded-lg text-white" onClick={handleChangeUnit}>°C/F</button>
    </section>
  );
};

export default Wheater;
