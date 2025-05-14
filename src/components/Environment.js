import React, { useState, useEffect } from "react";
import { AiOutlineHome } from 'react-icons/ai';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import environmentalData from "./environmentData.json";
import "./PageFull.css";

const Environment = () => {
  const navigate = useNavigate();
  const defaultCountry = "USA"; 
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const countryOptions = environmentalData.map((item) => item.country);
  const selectedData = environmentalData.find((item) => item.country === selectedCountry);

  const chartData = selectedData
    ? [
        { year: "2019", value: selectedData["2019"] },
        { year: "2020", value: selectedData["2020"] },
        { year: "2021", value: selectedData["2021"] },
      ]
    : [];

  useEffect(() => {
    if (!selectedData) {
      setSelectedCountry(countryOptions[0]);
    }
  }, [selectedCountry, countryOptions, selectedData]);

  return (
    <div className="page-full">
      <button className="floating-home-button" onClick={() => navigate('/')}>
              <AiOutlineHome size={20} style={{ marginRight: '8px' }} />
              Home
            </button>

      <h2>Environmental Impact by Country (2019–2021)</h2>
      <p>
        Select a country to view air pollution data over the pandemic years.
      </p>

      <label htmlFor="countrySelect">Select Country:</label>
      <br />
      <select
        id="countrySelect"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        <option value="">-- Select a Country --</option>
        {countryOptions.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3498db" name="Pollution Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Environment;
