import React, { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from API on initial render
  useEffect(() => {
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched countries:", data); // Debug: Check the structure
        setCountries(data);
      })
      .catch((error) => {
        console.error('API fetch error:', error);
      });
  }, []);

  // Filter countries based on search input
  const filteredCountries = countries.filter((country) => {
    return (
      country?.name?.common &&
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
              name={country.name.common}
              flag={country.flags?.png || ''}
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
