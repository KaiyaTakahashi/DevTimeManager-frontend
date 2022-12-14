import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Paper } from '@mui/material';
Axios.defaults.withCredentials = true;

const dataa = [
  {date: 'Sun', value: 0},
  {date: 'Mon', value: 300},
  {date: 'Tue', value: 600},
  {date: 'Wed', value: 800},
  {date: 'Thu', value: 1500},
  {date: 'Fri', value: 2000},
  {date: 'Sat', value: 2400},
];

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState()
  const fetchData = async () => {
    Axios.get("http://localhost:3001/weekly_tasks/get").then((response) => {
      var temp = [];
      var index = 0;
      while (index < 7 && index < response.data.length) {
        temp.push({ date: response.data[index].date.substring(5, 10), value: response.data[index].value })
        index += 1;
      }
      console.log("this is temp: ",temp)
      setData(temp);
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div id='weekly-column-div'>
      <h1 className="section-title">Weekly Column</h1>
      <Paper id='weekly-column'>
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
      </Paper>
    </div>
  );
}