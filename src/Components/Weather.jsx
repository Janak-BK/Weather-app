import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import Cloud from "../Assets/cloud.jpg";
import Badal from "../Assets/container.jpg"


const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  const API_KEY = "ec002a992b9ba2e8b2ad77e6914eb9fd";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  function handleOnChnage(event) {
    setCity(event.target.value);
  }
  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        // console.log(output);
        setError("");
      } else {
        setWeather(null);
        setError("No data found.Please enter a valid city name!.");
      }
    } catch (error) {
      
    }
  }
  return (
      <div className="container">
        <div className="description">
          <h1 className="heading">Weather Today</h1>
          <h4>Get weather information in seconds</h4>
        </div>
        <div className="city">
          <input
            type="text"
            value={city}
            onChange={handleOnChnage}
            placeholder="Enter your city name"
          />
          <button onClick={() => fetchData()}>
            Submit
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {weather && weather.weather && (
          <div className="content">
            <div className="weather-image">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              <h3 className="desc">{weather.weather[0].description}</h3>
            </div>
            <div className="weather-temp">
              <h2>
                {weather.main.temp}
                <span>&deg;C</span>
              </h2>
            </div>
            <div className="weather-city">
              <div className="location">
                <FaLocationDot />
              </div>
              <p>
                {weather.name},<span>{weather.sys.country}</span>
              </p>
            </div>
            <div className="weather-stats">
              <div className="wind">
                <div className="wind-icon">
                  <FaWind />
                </div>
                <h3 className="wind-speed">
                  {weather.wind.speed} <span>Km/h</span>{" "}
                </h3>
                <h3 className="wind-heading">Wind Speed</h3>
              </div>
              <div className="humidity">
                <div className="humidity-icon">
                  <WiHumidity />
                </div>
                <h3 className="humidity-percent">
                  {weather.main.humidity} <span>%</span>{" "}
                </h3>
                <h3 className="humidity-heading">Humidity</h3>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Weather;
