import React from "react";
import "./App.css";

function Languages({ data }) {
  const arrMap = data.flat().reduce((acc, currVal) => {
    acc[currVal] = (acc[currVal] || 0) + 1;
    return acc;
  }, {});
  
  const entries = Object.entries(arrMap).sort((a, b) => b[1] - a[1]); // Convert the object to an array of key-value pairs

  return (
      <div className="chartWrapper" style={{ width: "100%" }}>
      <h2 style={{textAlign :'center'}}>10 most spoken languages</h2>

        {entries.splice(0, 9).map(([key, value]) => { // Destructure key and value
          const barWidth = Math.min(value, 100); // Ensure the maximum width is capped at 100
          return (
            <div className="chart" key={key}>
              <span className="lang">{key}</span>
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
              <span className="langCount">{value}</span>
            </div>
          );
        })}
      </div>
  );
}

export default Languages;
