import { useState } from "react";
import "../App.css";

const API_KEY = "0f8f9bfaf50c10ec7f692481c5ead569";

type Weather = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  sys: {
    sunrise: number;
    sunset: number;
  };
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data: Weather = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Unable to get weather. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  const time = (value: number) =>
    new Date(value * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="weather-app">
      <header className="app-header">
        <div className="header-container">
          <h2 className="logo">Weather Dashboard</h2>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div className="section-title">
            <h1>Weather Dashboard</h1>
            <p>Search weather information by city</p>
          </div>

          <div className="weather-search">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchWeather()}
            />

            <button className="btn" onClick={searchWeather}>
              Search
            </button>
          </div>

          {loading && <div className="loading">Loading...</div>}

          {error && <div className="error">{error}</div>}

          {weather && !loading && (
            <div className="weather-card">
              <h2>{weather.name}</h2>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />

              <h1>{Math.round(weather.main.temp)}°C</h1>

              <p className="description">
                {weather.weather[0].description}
              </p>

              <div className="weather-info">
                <div>
                  <h3>Humidity</h3>
                  <p>{weather.main.humidity}%</p>
                </div>

                <div>
                  <h3>Wind Speed</h3>
                  <p>{weather.wind.speed} m/s</p>
                </div>

                <div>
                  <h3>Sunrise</h3>
                  <p>{time(weather.sys.sunrise)}</p>
                </div>

                <div>
                  <h3>Sunset</h3>
                  <p>{time(weather.sys.sunset)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;