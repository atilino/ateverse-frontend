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
  FACEBOOK: {
    0: 'interaction',
    1: 'join-groups',
    2: 'share-groups',
    3: 'reports'
  },
  INSTAGRAM: {
    0: 'interaction',
  },
  TWITTER: {
    0: 'interaction',
    1: 'publication'
  }
}

export default {
  ORDER_STATUS,
  ACCOUNT_STATUS,
  PROFILE_STATUS,
  DEVICE_STATUS,
  PATTERNS,
  ORDER_VARIANTS
}
