import React from 'react';
import { TankRecord } from '../types/types.ts';
// @ts-ignore: allow importing CSS as a side-effect until a global declaration (e.g. src/global.d.ts) is added
import './List.css';

function List({data, nameFilter, dateFilter}: {data: TankRecord[], nameFilter: string, dateFilter: number}) {
  const totals = data.reduce(
    (acc, curr) => {
      acc.totalWaterUsage += curr.metrics.Water || 0;
      acc.totalWaterSavings += curr.savings.Water || 0;
      acc.totalTimeUsage += curr.metrics.time || 0;
      acc.totalTimeSavings += curr.savings.time || 0;
      return acc;
    },
    {
      totalWaterUsage: 0,
      totalWaterSavings: 0,
      totalTimeUsage: 0,
      totalTimeSavings: 0,
    }
  );

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
          <span>Total Water Used: {totalWaterUsage} gal</span>
          <span>Total Water Saved: {totalWaterSavings} gal</span>
          <span>Total Time Taken: {totalTimeUsage} s</span>
          <span>Total Time Saved: {totalTimeSavings} s</span>
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
                  <span>Water Use: {item.metrics.Water !== null ? `${item.metrics.Water}gal` : 'N/A'}</span>
                  <span>Water Saved: {item.savings.Water !== null ? `${item.savings.Water}gal` : 'N/A'}</span>
                  <span>Time Taken: {item.metrics.time !== null ? `${item.metrics.time}s` : 'N/A'}</span>
                  <span>Time Saved: {item.savings.time !== null ? `${item.savings.time}s` : 'N/A'}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default List