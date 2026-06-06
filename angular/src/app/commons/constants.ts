// App-wide constants that are independent from Angular components/services.
// Put feature-specific values next to their feature unless multiple areas need them.

import { environment } from '../../environments/environment';
import { TaskStatus } from './enums';

export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  tasks: `${API_BASE_URL}/tasks`,
  notifications: `${API_BASE_URL}/notifications`,
} as const;

export const STORAGE_KEYS = {
  currentUser: `${environment.storagePrefix}_user`,
  taskDraft: `${environment.storagePrefix}_task_draft`,
} as const;

export const RXJS_TIMING = {
  ...environment.timings,
};

export const TASKFLOW_COLUMNS = [
  { value: TaskStatus.Todo, label: 'Todo' },
  { value: TaskStatus.InProgress, label: 'In Progress' },
  { value: TaskStatus.Done, label: 'Done' },
] as const;
