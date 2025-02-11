export interface Store {
  name: string;
  updated_at: Date;
  prices: number[];
  rate: number;
  category: 'product' | 'equipment';
}
