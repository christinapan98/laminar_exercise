import React from 'react'

function List({data, nameFilter, dateFilter}: {data: any[], nameFilter: string, dateFilter: number}) {
 
  return (
    <div>
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