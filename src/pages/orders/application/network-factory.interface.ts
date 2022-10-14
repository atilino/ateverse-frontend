import { IOrder } from '../domain/order.entity'


export interface IFactory {
  createOrder(variant: number, order: IOrder): IOrder
}
