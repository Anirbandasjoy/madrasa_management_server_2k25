export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  SUPERADMIN: 'superadmin',
  STUDENT: 'student',
  USER: 'user',
  GUEST: 'guest',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

