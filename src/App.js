import React, { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    (country?.name?.common || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Country Search App</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="countriesContainer">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <CountryCard
              key={index}
              name={country.name?.common}
              flag={country.flags?.png}
            />
          ))
        ) : (
          <p>No matching countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
