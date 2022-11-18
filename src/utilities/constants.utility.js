const ORDER_STATUS = Object.freeze({
  CREATED: 'Creada',
  IN_PROGRESS: 'En progreso',
  FINISHED: 'Finalizada',
  ERROR: 'Error'
})

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

const MBIT = 125000

const ADMIN_PROFILE_STATUS = Object.freeze([
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

const PROFILE_STATUS = ADMIN_PROFILE_STATUS.filter(status => status.name === 'ENABLED' || status.name === 'DISABLED')

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
  PATTERNS,
  ORDER_VARIANTS,
  ADMIN_PROFILE_STATUS,
  MBIT
}
