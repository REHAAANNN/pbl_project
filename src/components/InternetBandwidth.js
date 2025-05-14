import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import './PageFull.css';

const bandwidthData = [
  {
    "Year": 2021,
    "World": 971,
    "Low-income": 4,
    "Lower-middle-income": 137,
    "Upper-middle-income": 179,
    "High-income": 650,
    "Least Developed Countries (LDCs)": 11,
    "Land Locked Developing Countries (LLDCs)": 12,
    "Small Island Developing States (SIDS)": 44
  },
  {
    "Year": 2022,
    "World": 1196,
    "Low-income": 6,
    "Lower-middle-income": 184,
    "Upper-middle-income": 219,
    "High-income": 786,
    "Least Developed Countries (LDCs)": 16,
    "Land Locked Developing Countries (LLDCs)": 16,
    "Small Island Developing States (SIDS)": 54
  },
  {
    "Year": 2023,
    "World": 1458,
    "Low-income": 8,
    "Lower-middle-income": 230,
    "Upper-middle-income": 265,
    "High-income": 952,
    "Least Developed Countries (LDCs)": 23,
    "Land Locked Developing Countries (LLDCs)": 25,
    "Small Island Developing States (SIDS)": 62
  }
];

const InternetBandwidth = () => {
  const [selectedCountry, setSelectedCountry] = useState('World');
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredData = bandwidthData.map(item => ({
    Year: item.Year,
    Bandwidth: item[selectedCountry] || 0
  }));

  return (
    <div className="internet-bandwidth">
      {/* Back to Home button */}
      <button className="floating-home-button" onClick={() => navigate('/')}>
              <AiOutlineHome size={20} style={{ marginRight: '8px' }} />
              Home
            </button>


      <h2>International Bandwidth Usage (2021–2023)</h2>
      <p>Compare bandwidth usage across countries for the years 2021 to 2023:</p>

      <div>
        <label htmlFor="country-select">Select Country: </label>
        <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
          <option value="World">World</option>
          <option value="Low-income">Low-income</option>
          <option value="Lower-middle-income">Lower-middle-income</option>
          <option value="Upper-middle-income">Upper-middle-income</option>
          <option value="High-income">High-income</option>
          <option value="Least Developed Countries (LDCs)">Least Developed Countries (LDCs)</option>
          <option value="Land Locked Developing Countries (LLDCs)">Land Locked Developing Countries (LLDCs)</option>
          <option value="Small Island Developing States (SIDS)">Small Island Developing States (SIDS)</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis label={{ value: 'Bandwidth (Tbit/s)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Bandwidth" fill="#8884d8" name="Bandwidth Usage (Tbit/s)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InternetBandwidth;