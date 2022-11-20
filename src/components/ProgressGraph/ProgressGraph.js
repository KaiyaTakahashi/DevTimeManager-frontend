import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';

const data = [
  {date: '00:00', value: 0},
  {date: '03:00', value: 300},
  {date: '06:00', value: 600},
  {date: '09:00', value: 800},
  {date: '12:00', value: 1500},
  {date: '15:00', value: 2000},
  {date: '18:00', value: 2400},
  {date: '21:00', value: 2400},
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <h1>Weekly Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='color' x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}></stop>
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke='#2451B7' fill='url(#color)'/>
          <XAxis dataKey="date" />
          <YAxis 
            dataKey="value" 
            axisLine={false} 
            tickLine={false} 
            tickCount={8}
          />
          <Tooltip></Tooltip>
          <CartesianGrid opacity={0.5} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}