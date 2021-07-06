import React, { useState } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});

	const search = async (e) => {
		// Search for city when user hits enter
		if (e.key === "Enter") {
			const data = await fetchWeather(query);
			setWeather(data);
			setQuery("");
		}
	};

	return (
		<div className="main-container">
			<input
				type="text"
				className="search"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={search}
			/>
			{/* If weather exists, return info */}
			{weather.main && (
				<div className="city">
					<h2 className="city-name">
						{/* City */}
						<span>{weather.name}</span>
						{/* Superscript badge */}
						<sup>{weather.sys.country}</sup>
					</h2>
					{/* Temp */}
					<div className="city-temp">
						{Math.round(weather.main.temp)}
						<sup>&deg;C</sup>
					</div>
					<div className="info">
						{/* Weather icon */}
						<img
							className="city-icon"
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
							alt={weather.weather[0].description}
						/>
					</div>
					{/* Description of weather */}
					<p>{weather.weather[0].description}</p>
				</div>
			)}
		</div>
	);
};

export default App;
