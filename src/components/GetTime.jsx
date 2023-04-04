import React, { useEffect, useState } from "react";
import "./GetTime.css"


const GetTime = ({ inicio, fin, zona, city }) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [isDay, setIsDay] = useState()


  function updateHora() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
  const cityOffset = zona * 1000;
  const timeDifference = cityOffset + timezoneOffset;
  const cityTime = now.getTime() + timeDifference;
  setIsDay(cityTime>=inicio *1000 && cityTime<=fin *1000)
  setCurrentTime(new Date(cityTime));
  }
  useEffect(() => {
    const intervalID = setInterval(updateHora, 1000);
    return () => clearInterval(intervalID);
  }, [inicio, fin, zona]);

  return (
    <div className="text-2xl bg-blue-900/50 rounded-xl backdrop-blur-[5px] sm:min-w-[450px] p-1 relative">
      <p>{`La hora actual en ${city} es ${
        currentTime ? currentTime.toLocaleTimeString() : ""
      }`}</p>

      {isDay ? <img className="sun" src="/img/sun.png" alt="" />
      :<img className="moon" src="/img/moon.png" alt="" />
      }
    </div>
  );






};
export default GetTime
