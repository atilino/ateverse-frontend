
export const COLUMNS = [
  {
    title: 'Dispositivo',
    key: 'device',
    dataIndex: ['accountId', 'deviceId', 'imei'],
    render: imei => imei || 'No asignado'
  },
  {
    title: 'Red social',
    dataIndex: 'network',
    key: 'network',
    render: network => network?.name
  },
  {
    title: 'Nombre',
    dataIndex: 'accountId',
    key: 'accountId',
    responsive: ['md'],
    render: account => account?.name || 'No existe'
  },
  {
    title: 'Usuario',
    dataIndex: 'username',
    key: 'username',
    responsive: ['md'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Contraseña',
    dataIndex: 'password',
    key: 'password',
    responsive: ['md'],
  }
]

export const PROFILE_STATUS = Object.freeze([
  {
    name: 'DISABLED',
    label: 'Deshabilitado',
  },
  {
    name: 'ENABLED',
    label: 'Habilitado',
  },
  {
    name: 'BLOCKED',
    label: 'Bloqueado',
  },
  {
    name: 'VERIFICATION',
    label: 'Verificación pendiente',
  },
  {
    name: 'LOGIN_ERROR',
    label: 'Error de login',
  },
  {
    name: 'SUSPENDED',
    label: 'Suspendido',
  },
  {
    name: 'BAD_CREDENTIALS',
    label: 'Credenciales invalidas',
  },
  {
    name: 'LOGOUT_ERROR',
    label: 'Error de logout'
  },
])
