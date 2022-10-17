const ORDER_STATUS = Object.freeze([
  {
    name: 'CREATED',
    label: 'Creada',
  },
  {
    name: 'IN_PROGRESS',
    label: 'En progreso',
  },
  {
    name: 'FINISHED',
    label: 'Finalizada',
  },
  {
    name: 'ERROR',
    label: 'Error'
  },
])

const ACCOUNT_STATUS = Object.freeze([
  {
    name: 'DISABLED',
    label: 'Deshabilitada',
  },
  {
    name: 'ENABLED',
    label: 'Habilitada',
  },
  {
    name: 'BUSSY',
    label: 'Ocupada',
  },
  {
    name: 'IN_PERSISTENCE',
    label: 'En persistencia'
  },
])

const PROFILE_STATUS = Object.freeze([
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

const DEVICE_STATUS = Object.freeze([
  {
    label: 'Iniciado',
    name: 'ON'
  },
  {
    label: 'Suspendido',
    name: 'OFF'
  },
  {
    label: 'Ocupado',
    name: 'BUSSY'
  }
])

const PATTERNS = Object.freeze({
  FACEBOOK: {
    MAIN: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/,
    GROUPS: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/
  },
  TWITTER: {
    MAIN: /(?:(?:http|https):\/\/)?(?:www.)?twitter.com\/?/
  },
  INSTAGRAM: {
    MAIN: /(?:(?:http|https):\/\/)?(?:www.)?instagram.com\/?/
  },
})

const ORDER_VARIANTS = {
  facebook: [
    { id: 0, label: 'Interacción', name: 'interaction' },
    { id: 1, label: 'Agregar grupos', name: 'join-groups' },
    { id: 2, label: 'Compartir en grupos', name: 'share-groups' },
    { id: 3, label: 'Reportar', name: 'report' }
  ],
  instagram: [
    { id: 0, label: 'Interacción', name: 'interaction' },
  ],
  twitter: [
    { id: 0, label: 'Interacción', name: 'interaction' },
    { id: 1, label: 'Publicación', name: 'publication' }
  ]
}

export default {
  ORDER_STATUS,
  ACCOUNT_STATUS,
  PROFILE_STATUS,
  DEVICE_STATUS,
  PATTERNS,
  ORDER_VARIANTS
}
