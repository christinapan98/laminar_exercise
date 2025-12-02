import React, {useMemo} from 'react'

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
    <div>
      <div>
        <div>Aggregate Metrics for {nameFilter === "" ? "All Tanks " : nameFilter} in the last {dateFilter} days</div>
        <span>Total Water Used: {totalWaterUsage}</span>
        <span>Total Water Saved: {totalWaterSavings}</span>
        <span>Total Time Taken: {totalTimeUsage}</span>
        <span>Total Time Saved: {totalTimeSavings}</span>
      </div>

      {
        data.map((item) => (
          <div key={item.id} className="data-item">
            <h2>{item.tank_name}</h2>
            <p>{item.start_time}</p>
          </div>
        ))
      }
    </div>
  )
}

export default List