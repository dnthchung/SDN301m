import { TASKFLOW_COLUMNS } from '../../commons/constants';
import { TaskFilterStatus, TaskStatus } from '../../commons/enums';
import type { SelectOption } from '../../commons/types';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
}

export type CreateTaskRequest = Omit<Task, 'id'>;

export interface TaskFilters {
  keyword: string;
  status: TaskStatus | TaskFilterStatus.All;
}

export const TASK_STATUSES: ReadonlyArray<SelectOption<TaskStatus>> = TASKFLOW_COLUMNS;
export { TaskFilterStatus, TaskStatus };
