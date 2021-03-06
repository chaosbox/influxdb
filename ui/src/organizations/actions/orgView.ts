import _ from 'lodash'

import {
  ScraperTargetRequest,
  ITask as Task,
  ITaskTemplate,
} from '@influxdata/influx'

// API
import {client} from 'src/utils/api'
import {createTaskFromTemplate as createTaskFromTemplateAJAX} from 'src/templates/api'

export enum ActionTypes {
  GetTasks = 'GET_TASKS',
  PopulateTasks = 'POPULATE_TASKS',
}

export type Actions = PopulateTasks

export interface PopulateTasks {
  type: ActionTypes.PopulateTasks
  payload: {tasks: Task[]}
}

export const populateTasks = (tasks: Task[]): PopulateTasks => ({
  type: ActionTypes.PopulateTasks,
  payload: {tasks},
})

export const getTasks = (orgID: string) => async dispatch => {
  const tasks = await client.tasks.getAllByOrgID(orgID)
  dispatch(populateTasks(tasks))
}

export const createScraper = (scraper: ScraperTargetRequest) => async () => {
  await client.scrapers.create(scraper)
}

export const createTaskFromTemplate = (
  template: ITaskTemplate,
  orgID: string
) => async () => {
  await createTaskFromTemplateAJAX(template, orgID)
}
