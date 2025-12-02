import React, {useState, useEffect} from 'react';
import data from './data/data.json';
import List from './components/List.tsx';
import { BarChart } from '@mui/x-charts/BarChart';

import './App.css';

function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(60);
  
  const isStartWithinDateRange = (start_time: string) => {
    const currentDate = new Date();
    const itemDate = new Date(start_time);
    const diffTime = Math.abs(currentDate.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= dateFilter;
  };

  const calculateTotalWaterUsagePerTank = () => {
    const tankWaterUsage: {[key: string]: number} = {};
    data.forEach(item => {
      if (!tankWaterUsage[item.tank_name]) {
        tankWaterUsage[item.tank_name] = 0;
      }
      tankWaterUsage[item.tank_name] += item.metrics.Water || 0;
    });
    return tankWaterUsage;
  }

  const uniqueTankNames = Array.from(new Set(data.map(item => item.tank_name)));
  const tankWaterUsage = calculateTotalWaterUsagePerTank();
  return (
    <div className="App">
      <div className="App-filters">
         <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}>
          <option value="">
            No selection
          </option>
          {[...uniqueTankNames].map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input type="range" id="volume" name="volume" min={0} max={60} value={dateFilter}
        onChange={(e) => setDateFilter(Number(e.target.value))}/>
        {dateFilter}

        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: [...uniqueTankNames],
            },
          ]}
          series={[
            {
              data: Object.values(tankWaterUsage),
            },
          ]}
          height={150}
          width={300}
        />
      </div>
          
      <List data={data.filter(item => item.tank_name.includes(nameFilter) && isStartWithinDateRange(item.start_time))} nameFilter={nameFilter} dateFilter={dateFilter}/>
    </div>
  );
}

export default App;
