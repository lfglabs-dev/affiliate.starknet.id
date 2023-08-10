export enum Period {
  DAILY = 1,
  WEEKLY = 7,
  MONTHLY = 30,
  YEARLY = 365,
}

export const PeriodToSpacing: Record<Period, string> = {
  [Period.DAILY]: "86400",
  [Period.WEEKLY]: "604800",
  [Period.MONTHLY]: "2629746",
  [Period.YEARLY]: "31536000",
};

export type RevenueResponse = {
  revenues: Array<number>;
};

export type CountResponse = {
  counts: Array<number>;
};

export type OverviewProps = {
  value: string;
  differenceInPercent: number;
};
