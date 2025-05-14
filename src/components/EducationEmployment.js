import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './PageFull.css';

import closureData from './educationData';
import { AiOutlineHome } from 'react-icons/ai';

const dropoutData = [
  // ... same dropout data
];

const EducationEmployment = () => {
  const [selectedCountry, setSelectedCountry] = useState('Turkmenistan');
  const [selectedDataset, setSelectedDataset] = useState('closure');
  const navigate = useNavigate();

  const handleCountryChange = (e) => setSelectedCountry(e.target.value);
  const handleDatasetChange = (e) => setSelectedDataset(e.target.value);

  const filteredClosureData = closureData.filter(item => item.Country === selectedCountry);

  return (
    <div className="page-full">
      <button className="floating-home-button" onClick={() => navigate('/')}>
              <AiOutlineHome size={20} style={{ marginRight: '8px' }} />
              Home
            </button>

      <h2>Education Impacts During COVID-19</h2>
      <p>Visualize school closure durations or student dropout rates across countries.</p>

      <div className="controls-row">
        <div className="select-group">
          <label htmlFor="dataset-select">Dataset:</label>
          <select id="dataset-select" value={selectedDataset} onChange={handleDatasetChange}>
            <option value="closure">School Closure Data</option>
            <option value="dropout">Dropout Rate Data</option>
          </select>
        </div>

        {selectedDataset === 'closure' && (
          <div className="select-group">
            <label htmlFor="country-select">Country:</label>
            <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
              {closureData.map((item, index) => (
                <option key={index} value={item.Country}>
                  {item.Country}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={420}>
          {selectedDataset === 'closure' ? (
            <BarChart data={filteredClosureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Country" />
              <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Days fully closed" fill="#ffc658" name="Days Fully Closed" />
              <Bar dataKey="Days partially closed" fill="#ff8042" name="Days Partially Closed" />
              <Bar dataKey="Total" fill="#82ca9d" name="Total Days Closed" />
            </BarChart>
          ) : (
            <BarChart data={dropoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Country" />
              <YAxis label={{ value: 'Dropout Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Dropout" fill="#8884d8" name="Dropout Rate" />
              <Bar dataKey="Benchmark" fill="#82ca9d" name="Benchmark Rate" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EducationEmployment;
