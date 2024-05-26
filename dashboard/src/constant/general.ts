// Define the enum
export enum STATUS {
  QUEUED = "Queued",
  IN_PROGRESS = "In Progress",
  SUCCESS = "Success",
  FAILURE = "Failure"
}

// Create an array that maps the enum values to their labels
export const STATUSES = [
  { label: "Queued", value: STATUS.QUEUED },
  { label: "In Progress", value: STATUS.IN_PROGRESS },
  { label: "Success", value: STATUS.SUCCESS },
  { label: "Failure", value: STATUS.FAILURE },
];