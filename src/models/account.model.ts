export interface AccountConfiguration {
  browserId?: string;
  verifierId?: string;
}

export interface Account {
  _id: string;
  name: string;
  email: string;
  deviceId: string;
  profiles: Array<object>;
  _config: AccountConfiguration
}
