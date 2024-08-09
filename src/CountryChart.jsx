import React from "react";

function CountryChart({ worldPopulation, other }) {
  return (
    <div className="chartWrapper" style={{ width: "100%" }} key={1}>
      {/* Header for the chart */}
      <h2 style={{ textAlign: 'center' }}>10 Most Populated Countries</h2>

      {/* World Population Bar */}
      <div
        className="chart worldChart"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          width: "100%",
          gap: "10px",
        }}
      >
        <span className="countryName">World</span> {/* Label for the world population */}
        <span className="barWrap">
          <span
            className="bar"
            style={{
              width: "100%", // Set the width to 100% for the world population
              backgroundColor: "#F4CE14",
              height: "20px",
            }}
          ></span>
        </span>
        <span className="countryPopulation">
          {worldPopulation.toLocaleString()} {/* Display the world population */}
        </span>
      </div>

      {/* Other Countries' Population Bars */}
      {other.slice(0, 9).map((country) => {
        // Calculate bar width as a percentage of the world population
        const barWidth = (country.population / worldPopulation) * 100;
        return (
          <div className="chart" key={country.countryName}>
            <span className="countryName">{country.countryName}</span> {/* Label for the country name */}
            <span className="barwrap">
              <span
                className="bar"
                style={{
                  width: `${barWidth}%`, // Set the bar width based on the country's population relative to the world population
                  minWidth: "5px", // Ensure a minimum visible width for the bars
                  backgroundColor: "#F4CE14",
                  height: "20px",
                }}
              ></span>
            </span>
            <span className="countryPopulation">
              {country.population.toLocaleString()} {/* Display the country's population */}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default CountryChart;
