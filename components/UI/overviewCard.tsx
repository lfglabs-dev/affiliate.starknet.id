import { FC, ReactNode, useMemo } from "react";
import { Period } from "../../types/metrics/types";
import { PeriodToDifferenceLabel } from "../../utils/period";
import styles from "../../styles/components/identityMenu.module.css";
import overviewStyles from "../../styles/components/overviewCard.module.css";

interface OverviewCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  differenceInPercent: number;
  period: Period;
  style?: "primary" | "secondary";
}

export const OverviewCard: FC<OverviewCardProps> = ({
  title,
  value,
  icon,
  differenceInPercent,
  style = "secondary",
  period,
}) => {
  const differenceLabel = useMemo(() => {
    if (differenceInPercent > 0) {
      return `+${differenceInPercent}%`;
    } else {
      return `${differenceInPercent}%`;
    }
  }, [differenceInPercent]);

  const differenceLabelSuffix = useMemo(() => {
    const label = PeriodToDifferenceLabel[period];
    return `since ${label}`;
  }, [period]);

  const isPositive = useMemo(() => {
    return differenceInPercent > 0;
  }, [differenceInPercent]);

  return (
    <div className={overviewStyles.card}>
      <div className="flex flex-row justify-center items-center w-full">
        <div className="flex flex-col justify-center items-start w-full">
          <p className="text-small">{title}</p>
          <h3 className="mt-1">{value}</h3>
          <div className="flex flex-row items-center justify-start mt-2">
            <p
              className={`${
                isPositive ? overviewStyles.green : overviewStyles.red
              } text-small`}
            >
              {differenceLabel}
            </p>
            <p className="text-micro ml-1">{differenceLabelSuffix}</p>
          </div>
        </div>
        <div
          className={
            style === "secondary"
              ? styles.clickableIconSecondary
              : styles.clickableIconPrimary
          }
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
