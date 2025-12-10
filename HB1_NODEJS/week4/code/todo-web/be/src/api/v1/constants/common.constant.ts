export const GenderObject = {
  male: 'male',
  female: 'female',
  other: 'other'
} as const

export const StatusUser = {
  active: 'active',
  inactive: 'inactive',
  suspended: 'suspended',
  deleted: 'deleted'
} as const

export const ErrorType = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CAST_ERROR: 'CAST_ERROR',
  DUPLICATE_KEY_ERROR: 'DUPLICATE_KEY_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const
