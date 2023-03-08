export interface IOrder {
  network: string;
  options: object;
  variant: number;
  priority?: boolean;
  customer: string;
  validate(): boolean;
}
