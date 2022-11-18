export interface Device {
  id: string
  imei: string
  status: string
  switch: boolean
  agentsLimit: number
  password: string
  region: string
  connected: boolean
  upgradeable: boolean
  version: string
  accounts?: object[]
}