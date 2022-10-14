import { IOrder } from '../domain/order.entity'


export interface IOrderFactory {
  createNetworkOrder(networkName: string, order: IOrder): IOrder
}
