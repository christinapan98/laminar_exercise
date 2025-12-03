  export const isStartWithinDateRange = (start_time: string, dateFilter: number) => {
    const currentDate = new Date();
    const itemDate = new Date(start_time);
    const diffTime = Math.abs(currentDate.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= dateFilter;
  };
