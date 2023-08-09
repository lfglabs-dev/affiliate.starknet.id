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

export const getLevelStartTime = (
  today: number
): {
  since_date: number;
  spacing: number;
} => {
  const date = new Date();
  date.setMonth(7); // August
  date.setDate(7); // day of the month
  date.setHours(0, 0, 0, 0); // Set the time to midnight
  const since_date = date.getTime();
  const spacing = today - since_date;

  return { since_date, spacing: spacing + 10 };
};

export const getMonths = () => {
  const currentMonth = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return [
    ...months.slice(currentMonth + 1),
    ...months.slice(0, currentMonth + 1),
  ];
};
