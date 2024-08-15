import { loginHandler, logoutHandler, signupHandler, userDetailsHandler } from './handlers/authHandler'
import { createCommentsHandler, getCommentsHandler, updateCommentHandler } from './handlers/commentsHandler'
import {
  allProjectsHandler,
  createProjectHandler,
  deleteProjectHandler,
  projectOverviewHandler,
  tasksForProjectHandler,
  updateProjectHandler,
} from './handlers/dashboardhandlers'
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
  ...createProjectHandler,
  ...updateProjectHandler,
  ...deleteProjectHandler,
  ...getCommentsHandler,
  ...createCommentsHandler,
  ...updateCommentHandler,
]
