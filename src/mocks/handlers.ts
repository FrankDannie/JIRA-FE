import { loginHandler, logoutHandler, signupHandler, userDetailsHandler } from './handlers/authHandler'
import { allProjectsHandler, projectOverviewHandler, tasksForProjectHandler } from './handlers/dashboardhandlers'

export const handlers = [
  ...loginHandler,
  ...signupHandler,
  ...logoutHandler,
  ...userDetailsHandler,
  ...projectOverviewHandler,
  ...allProjectsHandler,
  ...tasksForProjectHandler,
]
