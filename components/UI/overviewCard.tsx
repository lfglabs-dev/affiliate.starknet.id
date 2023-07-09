import { FC, ReactNode, useMemo } from "react";
import { Period } from "../../types/metrics/types";
import { PeriodToDifferenceLabel } from "../../utils/period";
import styles from "../../styles/components/identityMenu.module.css";


interface OverviewCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  differenceInPercent: number;
  period: Period;
  style?: "primary" | "secondary";
}

export const OverviewCard: FC<OverviewCardProps> = ({ title, value, icon, differenceInPercent, style = 'secondary', period }) => {
  const differenceLabel = useMemo(() => {
    if(differenceInPercent > 0) {
      return `+${differenceInPercent}%`
    } else {
      return `-${differenceInPercent}%`
    }
  }, [differenceInPercent])

  const differenceLabelSuffix = useMemo(() => {
    const label = PeriodToDifferenceLabel[period]
    return `since ${label}`
  }, [period])

  return (
    <div className="rounded-md">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-start">
          <p>{title}</p>
          <p>{value}</p>
          <div className="flex flex-row items-center justify-start">
            <p>{differenceLabel}</p>
            <p>{differenceLabelSuffix}</p>
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
  )
}