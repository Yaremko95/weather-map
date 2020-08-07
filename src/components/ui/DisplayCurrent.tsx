import React, { useEffect, useState } from "react";
import { useData } from "../data/DataProvider";
import { RiCelsiusLine } from "react-icons/ri";
function DisplayCurrent() {
  const { current, timezone, query, loading, hourly } = useData();
  const [convertedDate, convert] = useState("");
  useEffect(() => {
    const a = new Date(current.dt * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const weekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const day = weekDays[a.getDay() - 1];

    convert(
      day +
        ", " +
        date +
        " " +
        month +
        " " +
        year +
        " " +
        hour +
        ":" +
        min +
        ":" +
        sec
    );
  }, [current]);
  console.log(hourly);
  return (
    <div>
      <div>
        <span>{query}</span>
        <span>{convertedDate}</span>
        <span>{current.weather[0].description}</span>
      </div>
      <div>
        <div>
          <img
            src={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
          />
          <span>
            {(current.temp - 273.15).toFixed(1)} <RiCelsiusLine />
          </span>
        </div>
        <div>
          {current.rain && <span>Rain: </span>}
          <span>Humidity: {current.humidity}%</span>
          <span>Wind: {current.wind_speed}m/c</span>
        </div>
      </div>
    </div>
  );
}

export default DisplayCurrent;