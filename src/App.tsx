import React, {useState} from 'react';
import data from './data/data.json';
import List from './components/List.tsx';

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

  const uniqueTankNames = Array.from(new Set(data.map(item => item.tank_name)));

  return (
    <div className="App">
      <div className="App-filters">
         <select value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}>
          <option value="">
            Clear selection
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
      </div>

      <List data={data.filter(item => item.tank_name.includes(nameFilter) && isStartWithinDateRange(item.start_time))} nameFilter={nameFilter} dateFilter={dateFilter}/>
    </div>
  );
}

export default App;
