import React from "react";

function CountryChart({ worldPopulation, other }) {
  return (
    <div className="chartWrapper" style={{ width: "100%" }} key={1}>
      {/* World Population Bar */}
      <h2 style={{textAlign :'center'}}>10 most populated country</h2>
      <div
        className="chart worldChart"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          width: "100%",
          gap: "10px",
        }}
      >
        <span className="countryName">World</span>
        <span className="barWrap">
          <span className="bar"></span>
        </span>
        <span className="countryPopulation">
          {worldPopulation.toLocaleString()}
        </span>
      </div>

      {/* Other Countries' Population Bars */}
      {other.slice(0, 9).map((country) => {
        const barWidth = (country.population / worldPopulation) * 100;
        return (
          <div className="chart" key={country.countryName}>
            <span className="countryName">{country.countryName}</span>
            <span className="barwrap">
              <span
                className="bar"
                style={{
                  width: `${barWidth}%`,
                  minWidth: "5px", // Ensure a minimum visible width
                  backgroundColor: "#F4CE14",
                  height: "20px",
                }}
              ></span>
            </span>
            <span className="countryPopulation">
              {country.population.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default CountryChart;
