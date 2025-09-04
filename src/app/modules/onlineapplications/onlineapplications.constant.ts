export const ONLINEAPPLICATIONS_MESSAGES = {
  SUCCESS: 'Onlineapplications operation successful',
  FAILED: 'Onlineapplications operation failed',
};

export const ONLINEAPPLICATIONS_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type OnlineapplicationsStatus =
  (typeof ONLINEAPPLICATIONS_STATUS)[keyof typeof ONLINEAPPLICATIONS_STATUS];
