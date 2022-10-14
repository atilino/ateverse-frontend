import { IOrder } from '../models/order.entity'


export interface IFactory {
  createOrder(variant: number, order: IOrder): IOrder
}
