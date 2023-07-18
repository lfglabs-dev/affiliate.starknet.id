import React, { useMemo, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { Period } from "../types/metrics/types";
import { CustomSelect } from "../components/UI/customSelect";
import { OverviewCard } from "../components/UI/overviewCard";
import {
  CreditScoreRounded,
  ErrorOutline,
  Mouse,
  Paid,
} from "@mui/icons-material";
import { LineChart } from "../components/UI/lineChart";
import { RevenueCard } from "../components/UI/revenueCard";
import ClickableAction from "../components/UI/iconsComponents/clickableAction";
import analyticsStyle from "../styles/components/analytics.module.css";
import { PeriodToDifferenceLabel } from "../utils/period";
import { useAccount } from "@starknet-react/core";
import Error from "./error";

const Analytics: NextPage = () => {
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);
  const { address } = useAccount();
  const periods = [Period.DAILY, Period.WEEKLY, Period.MONTHLY, Period.YEARLY];

  const username = "Benjamin";
  const revenue = 1000;
  const numberOfDomainPurchased = 30;
  const numberOfClicksOnLink = 1200;

  const periodLabel = useMemo(() => {
    const label = PeriodToDifferenceLabel[period];
    return label;
  }, [period]);

  return (
    <div className={styles.screen}>
      {!address ? (
        <Error />
      ) : (
        <div className={styles.container}>
          <div id="recap-section" className={analyticsStyle.recapContainer}>
            <div className={`${analyticsStyle.row} justify-between w-full`}>
              <div className="flex flex-col justify-start items-start">
                <p className="text-micro">{`Hello ${username}, welcome to your dashboard`}</p>
                <p className="text-normal text-bold mt-2">{`You have earned $${revenue} in the ${periodLabel}`}</p>
              </div>
              <CustomSelect<Period>
                value={period}
                onChange={setPeriod}
                options={periods}
                optionPrefix="Last"
                optionSuffix="days"
              />
            </div>
          </div>
          <div id="overview-section" className="w-full mt-5">
            <div className={`${helper.row} gap-5`}>
              <OverviewCard
                title="Revenue"
                value={`$${revenue}`}
                icon={<Paid />}
                differenceInPercent={55}
                period={period}
              />
              <OverviewCard
                title="Number of domains purchased"
                value={`${numberOfDomainPurchased}`}
                icon={<CreditScoreRounded />}
                differenceInPercent={-5}
                period={period}
              />
              <OverviewCard
                title="Number of clicks on the link"
                value={`${numberOfClicksOnLink}`}
                icon={<Mouse />}
                differenceInPercent={55}
                period={period}
              />
            </div>
          </div>
          <div
            id="analytics-section"
            className={`${analyticsStyle.analyticsContainer}`}
          >
            <div className={`${helper.row} gap-5`}>
              <div className={`${analyticsStyle.chartSection} mt-8`}>
                <LineChart
                  title="Revenue"
                  differenceInPercent={55}
                  period={period}
                />
              </div>
              <div className={`${analyticsStyle.card} mt-8`}>
                <RevenueCard title="Revenue to claim" revenue={revenue} />
                <ErrorOutline className="mt-5" />
                <p className="text-default my-2">
                  You can claim your income from $200
                </p>
                <div className={helper.col}>
                  <ClickableAction
                    icon={<Paid />}
                    title="Claim your income"
                    width="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
