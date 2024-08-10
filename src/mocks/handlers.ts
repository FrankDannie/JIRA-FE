import { loginHandler, logoutHandler, signupHandler, userDetailsHandler } from './handlers/authHandler'
import { allProjectsHandler, projectOverviewHandler, tasksForProjectHandler } from './handlers/dashboardhandlers'
import { getTaskDetailsHandler, updateTaskHandler } from './handlers/taskHandlers'

export const handlers = [
  ...loginHandler,
  ...signupHandler,
  ...logoutHandler,
  ...userDetailsHandler,
  ...projectOverviewHandler,
  ...allProjectsHandler,
  ...tasksForProjectHandler,
  ...updateTaskHandler,
  ...getTaskDetailsHandler,
]
