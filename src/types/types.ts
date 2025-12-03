interface MetricsBlock {
  time: number | null;
  energy: number | null;
  Water: number | null;
}

export interface TankRecord {
  start_time: string;
  end_time: string;
  id: number;
  tank_name: string;
  savings: MetricsBlock;
  metrics: MetricsBlock;
}
