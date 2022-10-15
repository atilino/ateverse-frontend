const ORDER_STATUS = Object.freeze(["CREATED", "IN_PROGRESS", "FINISHED", "ERROR"])

const ACCOUNT_STATUS = Object.freeze(["DISABLED", "ENABLED", "BUSSY", "IN_PERSISTENCE"])

const PROFILE_STATUS = Object.freeze(["DISABLED", "ENABLED", "BLOCKED", "VERIFICATION", "LOGIN_ERROR", "SUSPENDED", "BAD_CREDENTIALS", "LOGOUT_ERROR"])

const DEVICE_STATUS = Object.freeze(["OFF", "ON", "BUSSY"])

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
