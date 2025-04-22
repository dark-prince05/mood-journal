import { useEffect, useState } from "react";

export default function DisplayWeather() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const url = "http://ip-api.com/json/";
    fetch(url, { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          setError("Unable to get location.");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLocation(data.city);
      })
      .catch((err) => {
        setError("Error getting location.");
        console.error("Error:", err);
      });
  }, []);

  useEffect(() => {
    const url = `https://api.weatherapi.com/v1/current.json?key=6625fcadd7e34a079a9113321252204&q=${location}`;
    fetch(url, { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeather(data.current);
      })
      .catch(() => {
        setError("Error getting weather.");
      });
  }, [location]);

  return (
    <>
      <div className="weather-card">
        <h3 className="weather-title">Today Weather </h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {location ? (
          <p className="weather-location"> {location}</p>
        ) : (
          <p>Loading location...</p>
        )}

        {weather && (
          <div className="weather-details">
            <img src={weather.condition.icon} alt="weather-icon" />
            <div>
              <p className="weather-text">{weather.condition.text}</p>
              <p className="weather-temp">{weather.temp_c}°C</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
