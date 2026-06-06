// Shared UI copy for TaskFlow.
// Keep feature-specific labels in the feature component when the text is used only once.

export const APP_MESSAGES = {
  auth: {
    nameRequired: 'Your name is required.',
    loginFailed: 'Cannot log in. Please try again.',
  },
  tasks: {
    createSuccess: 'Task created.',
    createFailed: 'Cannot create task. Check the API server.',
    deleteSuccess: 'Task deleted.',
    deleteFailed: 'Cannot delete task. Check the API server.',
    moveSuccess: 'Task moved.',
    moveFailed: 'Cannot move task. Check the API server.',
    loadFailed: 'Cannot load tasks. Start the API with npm run api.',
    emptyColumn: 'No tasks',
  },
  validation: {
    required: (field: string) => `${field} is required.`,
    maxLength: (field: string, maxLength: number) => `${field} must be ${maxLength} characters or fewer.`,
  },
} as const;
