
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { Planet } from '../types/types';

interface SolarSystemChartProps {
  data: Planet[];
}

export const SolarSystemChart: React.FC<SolarSystemChartProps> = ({ data }) => {
  const chartData = data.map(planet => ({
    name: planet.name,
    Diámetro: planet.diameter,
    color: planet.color,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e1dd" />
        <XAxis dataKey="name" stroke="#778da9" />
        <YAxis 
          stroke="#778da9" 
          tickFormatter={(value) => `${(value as number / 1000).toLocaleString()}k`} 
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e0e1dd',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#0d1b2a', fontWeight: 'bold' }}
          formatter={(value) => [`${(value as number).toLocaleString('es-ES')} km`, "Diámetro"]}
        />
        <Legend wrapperStyle={{ color: '#0d1b2a' }} />
        <Bar dataKey="Diámetro" name="Diámetro (km)">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
