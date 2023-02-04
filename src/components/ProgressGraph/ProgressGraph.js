import * as React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Paper } from '@mui/material';
import Button from '../Button/Button';

Axios.defaults.withCredentials = true;

export default function WeeklyColumn() {
  const [data, setData] = useState();
  const [dispayData, setDisplayData] = useState(data);
  const [range, setRange] = useState("");

  function handleRange(days) {
    var today = new Date();
    var filteredData = [];
    var index = data.length - 1;
    for (let i = 0; i < days; i ++) {
      const month = today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
      const date = (today.toDateString().substring(8, 10) + "/" + month);
      var totalValue = 0.0;
      while (index >= 0 && data[index].date === date) {
        totalValue += parseFloat(data[index].value);
        index -= 1;
      }
      filteredData.splice(0, 0, {date: date, value: totalValue});
      today.setDate(today.getDate() - 1);
    }
    setDisplayData(filteredData);
  }

  const fetchData = async () => {
    if (localStorage.getItem("isLoggedin") && localStorage.getItem("isLoggedin") === "true") {
      Axios.get('https://dev-time-manager-api.onrender.com/progress_tasks/get', {
        params: {
          email: localStorage.getItem("email")
      }
      }).then((response) => {
        var newData = [];
        var index = 0;
        var res = response.data;
        res.sort((a, b) => new Date(a.date) - new Date(b.date));
        res.map((item) => {
          item.date = new Date(item.date).toLocaleDateString();
        })
        while (index < res.length) {
          newData.push({ date: res[index].date.substring(0, 5), value: res[index].value })
          index += 1;
        }
        setData(newData);
        setDisplayData(newData);
      })
    }
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
          <Button 
            title="Year"
            onClick={() => {
              handleRange(365);
              setRange("y")
            }}
            isTapped={range === "y"}
            colour="blue"
          />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={dispayData}>
            <defs>
              <linearGradient id='color' x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.8}></stop>
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.1}></stop>
              </linearGradient>
            </defs>
            <Area dataKey="value" stroke='#2451B7' fill='url(#color)'/>
            <XAxis dataKey="date" />
            <YAxis 
              dataKey="value" 
              axisLine={false} 
              tickLine={false} 
              tickCount={8}
              unit="hrs"
            />
            <Tooltip></Tooltip>
            <CartesianGrid opacity={0.5} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
}