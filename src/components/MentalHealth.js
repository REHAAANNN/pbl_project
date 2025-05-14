import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import './PageFull.css';

const data = [
  { year: '2019', anxiety: 4.05, depression: 3.44 },
  { year: '2020', anxiety: 5.06, depression: 4.30 },
  { year: '2021', anxiety: 5.06, depression: 4.30 },
];

const MentalHealth = () => {
  const navigate = useNavigate();

  return (
    <div className="mental-health-fullpage">
      {/* Floating Home Button */}
      <button className="floating-home-button" onClick={() => navigate('/')}>
        <AiOutlineHome size={20} style={{ marginRight: '8px' }} />
        Home
      </button>

      {/* Page Content */}
      <h2>Mental Health & Social Behavior</h2>
      <p>Global prevalence of anxiety and depression (% of population):</p>

      {/* Chart Container */}
      <div className="chart-container">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: '% of population', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="anxiety" fill="#a8dadc" name="Anxiety (%)" />
            <Bar dataKey="depression" fill="#cdb4db" name="Depression (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MentalHealth;
