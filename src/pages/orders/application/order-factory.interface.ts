import { IOrder } from '../models/order.entity'


export interface IOrderFactory {
  createNetworkOrder(networkName: string, order: IOrder): IOrder
}
