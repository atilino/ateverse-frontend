export interface IOrder {
  userId: string;
  network: string;
  options: object;
  executed: object;
  variant: number;
  priority?: boolean;
  status?: string;
  deliveryAt?: Date;
  validate()
}
