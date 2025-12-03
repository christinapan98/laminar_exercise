import React, {useState} from 'react';
import data from './data/data.json';
import List from './components/List.tsx';
import { BarChart } from '@mui/x-charts/BarChart';
// @ts-ignore: allow importing CSS as a side-effect until a global declaration (e.g. src/global.d.ts) is added
import './App.css';

function App() {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<number>(60);
  
  const isStartWithinDateRange = (start_time: string) => {
    const currentDate = new Date();
    const itemDate = new Date(start_time);
    const diffTime = Math.abs(currentDate.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= dateFilter;
  };

  const calculateTotalWaterUsagePerTank = () => {
    const tankWaterMap: {[key: string]: Array<number>} = {};
    data.forEach(item => {
      if (!tankWaterMap[item.tank_name]) {
        tankWaterMap[item.tank_name] = [0, 0];
      }
      tankWaterMap[item.tank_name][0] += item.metrics.Water || 0;
      tankWaterMap[item.tank_name][1] += item.savings.Water || 0;
    });
    return tankWaterMap;
  }

  const uniqueTankNames = Array.from(new Set(data.map(item => item.tank_name)));
  const tankWaterMap = calculateTotalWaterUsagePerTank();
  return (
    <div className="App">
      <div className="App-left-col">
        <h3>Filter Selection</h3>
        <div className="App-filter-item">
          <label htmlFor="tankName">Tank Name:</label>
          <select id="tankName" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}>
            <option value="">
              No selection
            </option>
            {[...uniqueTankNames].map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="App-filter-item">
          <label htmlFor="dateRange">Range:</label>
          <input type="range" id="dateRange" min={0} max={60} value={dateFilter}
          onChange={(e) => setDateFilter(Number(e.target.value))}/>
          last {dateFilter}d
        </div>
      
        <h3>Overall Tank Water Usage</h3>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: [...uniqueTankNames],
            },
          ]}
          series={[
            {
              data: Object.values(tankWaterMap).map(item => item[0]),
            },
          ]}
          height={150}
          width={300}
        />

        <h3>Overall Tank Water Savings</h3>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: [...uniqueTankNames],
            },
          ]}
          series={[
            {
              data: Object.values(tankWaterMap).map(item => item[1]),
            },
          ]}
          height={150}
          width={300}
        />
      </div>
          
      <div className="App-right-col">
        <List data={data.filter(item => item.tank_name.includes(nameFilter) && isStartWithinDateRange(item.start_time))} nameFilter={nameFilter} dateFilter={dateFilter}/>
      </div>

    </div>
  );
}

export default App;
