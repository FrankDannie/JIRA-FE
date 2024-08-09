import { loginHandler, logoutHandler, signupHandler, userDetailsHandler } from './handlers/authHandler'

export const handlers = [...loginHandler, ...signupHandler, ...logoutHandler, ...userDetailsHandler]
