import { Period } from "../types/metrics/types";

export const PeriodToDifferenceLabel: Record<Period, string> = {
  [Period.DAILY]: "yesterday",
  [Period.WEEKLY]: "last week",
  [Period.MONTHLY]: "last month",
  [Period.YEARLY]: "last year",
};

export const getDifference = (arr: number[]): number => {
  let diff = 0;
  if (arr[0]) {
    diff = ((arr[1] - arr[0]) / arr[0]) * 100;
  } else {
    if (arr[1]) {
      diff = 100;
    }
  }
  return diff;
};
