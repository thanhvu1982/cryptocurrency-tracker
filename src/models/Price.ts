export interface PriceResponse {
  id: 'price';
  d: { t: number; cr: Price };
}

export interface Price {
  id: number;
  p7d: number | null;
  p30d: null | null;
  ts: number | null;
  as: number | null;
  fmc: number | null;
  mc: number | null;
  mc24hpc: number | null;
  vol24hpc: number | null;
  fmc24hpc: number | null;
  p1h: number | null;
  p24h: number | null;
  p: number | null;
  d: number | null;
  v: number | null;
}
