const ORDER_STATUS = Object.freeze({
  CREATED: 'Creada',
  IN_PROGRESS: 'En progreso',
  DELAYED: 'Retrasada',
  FINISHED: 'Finalizada',
  ERROR: 'Error',
  CANCELED: 'Cancelada',
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

const MBYTE = 8000000

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
    { id: 3, label: 'Reportar', name: 'report' },
    { id: 4, label: 'Seguir', name: 'follow' },
    { id: 5, label: 'Directo', name: 'direct' }

  ],
  instagram: [
    { id: 0, label: 'Interacción', name: 'interaction' },
    { id: 1, label: 'Seguir', name: 'follow' },
    { id: 2, label: 'Reportar', name: 'report' },
  ],
  twitter: [
    { id: 0, label: 'Interacción', name: 'interaction' },
    { id: 1, label: 'Publicación', name: 'publication' },
    { id: 2, label: 'Seguir', name: 'follow' },
  ]
}

const getOrderVariant = (networkName, variant) => {
  return ORDER_VARIANTS[networkName]?.find(v => v.id === variant).label
}

const BOOLEAN = {
  'true': true,
  'false': false
}

export default {
  ORDER_STATUS,
  ACCOUNT_STATUS,
  PATTERNS,
  ORDER_VARIANTS,
  MBIT,
  MBYTE,
  getOrderVariant,
  BOOLEAN
}
