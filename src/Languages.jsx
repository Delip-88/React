import React from "react";
import "./App.css";

function Languages({ data }) {
  // Flatten the nested array and count the occurrences of each language
  const arrMap = data.flat().reduce((acc, currVal) => {
    acc[currVal] = (acc[currVal] || 0) + 1; // Count each language
    return acc;
  }, {});

  // Convert the object to an array of key-value pairs and sort by count in descending order
  const entries = Object.entries(arrMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="chartWrapper" style={{ width: "100%" }}>
      <h2 style={{ textAlign: 'center' }}>10 Most Spoken Languages</h2>

      {entries.splice(0, 9).map(([key, value]) => { // Take the top 9 languages
        // Cap the bar width at 100% even if the count is higher
        const barWidth = Math.min(value, 100);
        return (
          <div className="chart" key={key}>
            <span className="lang">{key}</span> {/* Display the language name */}
            <span className="barwrap">
              <span
                className="bar"
                style={{
                  width: `${barWidth}%`, // Set the bar width based on the count
                  minWidth: "5px", // Ensure a minimum visible width
                  backgroundColor: "#F4CE14",
                  height: "20px",
                }}
              ></span>
            </span>
            <span className="langCount">{value}</span> {/* Display the count */}
          </div>
        );
      })}
    </div>
  );
}

export default Languages;
