import React, {useMemo} from 'react';
// @ts-ignore: allow importing CSS as a side-effect until a global declaration (e.g. src/global.d.ts) is added
import './List.css';

function List({data, nameFilter, dateFilter}: {data: any[], nameFilter: string, dateFilter: number}) {
  const totals = useMemo(() => {
    return data.reduce(
      (acc, curr) => {
        acc.totalWaterUsage += curr.metrics.Water;
        acc.totalWaterSavings += curr.savings.Water;
        acc.totalTimeUsage += curr.metrics.time;
        acc.totalTimeSavings += curr.savings.time;
        return acc;
      },
      {
        totalWaterUsage: 0,
        totalWaterSavings: 0,
        totalTimeUsage: 0,
        totalTimeSavings: 0,
      }
    );
  }, [data]);

  const {
    totalWaterUsage,
    totalWaterSavings,
    totalTimeUsage,
    totalTimeSavings,
  } = totals;

  return (
    <div className="List-container">
      <div>
        <h3>Aggregate Metrics for {nameFilter === "" ? "All Tanks " : nameFilter} in the last {dateFilter} days</h3>
        <div className="List-aggregates">
          <span>Total Water Used: {totalWaterUsage}</span>
          <span>Total Water Saved: {totalWaterSavings}</span>
          <span>Total Time Taken: {totalTimeUsage}</span>
          <span>Total Time Saved: {totalTimeSavings}</span>
        </div>
      </div>

      <h3>Data List</h3>
      {
        data.map((item) => {
          const startTime = new Date(item.start_time);
          const endTime = new Date(item.end_time);
          return (
            <div key={item.id} className="List-item">
              <em>{item.tank_name} (ID: {item.id})</em>
              <p>Started at: {String(startTime)}</p>
              <p>Ended at: {String(endTime)}</p>
              <div className="List-metrics">
                  <span>Water Used: {item.metrics.Water}</span>
                  <span>Water Saved: {item.savings.Water}</span>
                  <span>Time Taken: {item.metrics.time}</span>
                  <span>Time Saved: {item.savings.time}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default List