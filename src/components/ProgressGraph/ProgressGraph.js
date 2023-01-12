import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Paper, chart } from '@mui/material';
import Button from '../Button/Button';

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

export default function WeeklyColumn() {
  const theme = useTheme();
  const [data, setData] = useState();
  const [dispayData, setDisplayData] = useState(data);
  const [range, setRange] = useState("w");

  function handleRange(days) {
    var today = new Date();
    var filteredData = [];
    console.log("data: ",data)
    var index = data.length - 1;
    for (let i = 0; i < days; i ++) {
      const month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
      const date = (month + "-" + today.toDateString().substring(8, 10));
      var totalValue = 0;
      while (index >= 0 && data[index].date == date) {
        totalValue += data[index].value;
        index -= 1;
      }
      filteredData.splice(0, 0, {date: date, value: totalValue});
      today.setDate(today.getDate() - 1);
    }
    const t = new Date()
    console.log(t.toLocaleDateString())
    console.log(filteredData);
    setDisplayData(filteredData);
  }

  const fetchData = async () => {
    Axios.get("http://localhost:3001/weekly_tasks/get").then((response) => {
      var newData = [];
      var index = 0;
      console.log(response.data)
      while (index < response.data.length) {
        newData.push({ date: response.data[index].date.substring(5, 10), value: response.data[index].value })
        index += 1;
      }
      setDisplayData(newData)
      setData(newData);
      console.log("whole data: ", data);
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div id='weekly-column-div'>
      <h1 className="section-title">Weekly Column</h1>
      <Paper id='weekly-column'>
        <div id='range-box'>
          <Button 
            title="Week"
            onClick={() => {
              handleRange(7);
              setRange("w");
            }}
            isTapped={range === "w"}
            colour="blue"
          />
          <Button 
            title="Month"
            onClick={() => {
              handleRange(31);
              setRange("m")
            }}
            isTapped={range === "m"}
            colour="blue"
          />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={dispayData}>
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