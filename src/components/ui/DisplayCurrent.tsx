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
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const day = weekDays[a.getDay()];

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "20px",
          color: "whitesmoke",
        }}
      >
        <span>{query.toUpperCase()}</span>
        <span>{convertedDate}</span>
        <span>{current.weather[0].description}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "whitesmoke",
          }}
        >
          <img
            src={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
          />
          <span>
            {(current.temp - 273.15).toFixed(1)} <RiCelsiusLine />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "5rem",
            color: "whitesmoke",
          }}
        >
          {current.rain && <span>Rain: </span>}
          <span>Humidity: {current.humidity}%</span>
          <span>Wind: {current.wind_speed}m/c</span>
        </div>
      </div>
    </div>
  );
}

export default DisplayCurrent;
