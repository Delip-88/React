import React, { useState, useEffect } from "react";
import "./App.css";
import CountryChart from "./CountryChart";
import Languages from "./Languages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");

  const handleChange = (e) => {
    setSearchCountry(e.target.value);
  };

  const fetchData = async (countryName = "all") => {
    setLoading(true);
    setError(null); // Reset any previous errors before making a new request

    const url =
      countryName === "all"
        ? `https://restcountries.com/v3.1/all`
        : `https://restcountries.com/v3.1/name/${countryName}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const filteredData = result.map((country) => {
        const languages = country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A";
        const currencies = country.currencies
          ? Object.values(country.currencies)
              .map((currency) => currency.name)
              .join(", ")
          : "N/A";
        return {
          countryName: country.name.common,
          capital: country.capital ? country.capital[0] : "N/A",
          languages,
          imageUrl: country.flags.png,
          flagAlt: country.flags.alt,
          population: country.population,
          currencies,
        };
      });
      setData(filteredData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading ....</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  // Searched filtered data
  const filteredList = data
    .filter((country) =>
      country.countryName.toLowerCase().includes(searchCountry.toLowerCase())
    )
    .sort((a, b) => b.population - a.population); // Sort by population in descending order

  const satisfiedListCount = filteredList.length;

  // Filtered country language
  const languageList = filteredList.map((country) => country.languages);
  const languagesArr = languageList.flatMap(item=> item.split(',').map(lang=>lang.trim()))
  // console.log(languagesArr)
  // All country population
  const worldPopulationList = data.map((country) => country.population);
  const worldPopulation = worldPopulationList.reduce((a, b) => a + b, 0);

  return (
    <Router>
      <div>
        <center>
          <header>
            <h1>World Countries Data</h1>
            <h2>Currently, We have {data.length} Countries</h2>
            {satisfiedListCount < data.length && (
              <div className="satisfied">
                <span className="yellow">{satisfiedListCount}</span> satisfied
                the search criteria.
              </div>
            )}
          </header>
          <input
            type="text"
            name="searchbar"
            id="searchbar"
            placeholder="search country by name.."
            onChange={handleChange}
            value={searchCountry}
          />
        </center>

        <center>
          <div
            className="container"
            style={{
              padding: "20px",
              backgroundColor: "#F3F5F7",
              width: "80%",
            }}
          >
            <div className="countryWrapper">
              {filteredList.map((country, index) => (
                <div key={index} className="country">
                  <img
                    src={country.imageUrl}
                    className="flag"
                    alt={`${
                      country.flagAlt
                        ? country.flagAlt
                        : country.countryName + " flag"
                    } `}
                  />
                  <h3>
                    <span className="data">{country.countryName}</span>
                  </h3>
                  <p>
                    Capital:<span className="data"> {country.capital}</span>
                  </p>
                  <p>
                    Languages:<span className="data"> {country.languages}</span>
                  </p>
                  <p>
                    Population:
                    <span className="data">
                      {" "}
                      {country.population.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Currency:<span className="data"> {country.currencies}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </center>

        <center>
          <footer>
            <NavLink
              to="/population"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Population
            </NavLink>
            <NavLink
              to="/languages"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Languages
            </NavLink>
          </footer>
        </center>

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/population" />} // Redirect root path to /population
          />
          <Route
            path="/population"
            element={
              <CountryChart
                worldPopulation={worldPopulation}
                other={filteredList}
              />
            }
          />
          <Route
            path="/languages"
            element={<Languages data={languagesArr} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
