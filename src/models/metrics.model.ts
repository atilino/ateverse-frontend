export interface VariantMetric {
  name: string,
  qty: number,
  label: string
}

export interface NetworkMetric {
  name: string
  label: string
  qty: number
}

export interface CustomerMetric {
  name: string,
  qty: number
}

export interface Metrics {
  totalOrders: number
  taskOrders: VariantMetric[]
  networkOrders: NetworkMetric[]
  customerOrders: CustomerMetric[]
}