const protocol = 'http'
const PORT = process.env.PORT || 3001
const HOSTNAME = process.env.HOSTNAME || 'localhost'
export const DOMAIN = `${protocol}://${HOSTNAME}:${PORT}`
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'MySchedulerToken'