import React from "react";
import "./CountryCard.css";

function CountryCard({ name, flag }) {
  return (
    <div className="countryCard">
      <img src={flag} alt={`Flag of ${name}`} />
      <h2>{name}</h2>
    </div>
  );
}

export default CountryCard;
