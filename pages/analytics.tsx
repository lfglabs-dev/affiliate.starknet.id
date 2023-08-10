import React, { useMemo, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { Period, PeriodToSpacing } from "../types/metrics/types";
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
import { PeriodToDifferenceLabel, getDifference } from "../utils/period";
import { useAccount, useContractWrite } from "@starknet-react/core";
import Error from "./error";
import {
  useGetClicks,
  useGetRevenue,
  useGetSalesCount,
  useRemainingBalance,
} from "../hooks/metrics";
import { hexToDecimal } from "../utils/feltService";
import { toReadablePrice } from "../utils/priceService";
import { Call } from "starknet";
import { useDisplayName } from "../hooks/displayName";

const Analytics: NextPage = () => {
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);
  const { address } = useAccount();
  const periods = [Period.DAILY, Period.WEEKLY, Period.MONTHLY, Period.YEARLY];
  const domainOrAddress = useDisplayName(address ?? "");
  const aYearAgo = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime() /
      1000
  );
  const emptyOverview = {
    value: "0",
    differenceInPercent: 0,
  };
  const { balance, error } = useRemainingBalance(hexToDecimal(address) ?? "0");
  const { writeAsync: executeClaim } = useContractWrite({
    calls: [
      {
        contractAddress: process.env.NEXT_PUBLIC_REFERRAL_CONTRACT as string,
        entrypoint: "claim",
        calldata: [],
      },
    ],
  });

  const remainingBalance = useMemo(() => {
    if (!balance || error) return 0;
    return toReadablePrice(Number(balance));
  }, [balance]);

  const sinceDate = useMemo(() => {
    const today = new Date();
    switch (period) {
      case Period.DAILY:
        today.setDate(today.getDate() - Period.DAILY * 2);
        break;
      case Period.WEEKLY:
        today.setDate(today.getDate() - Period.WEEKLY * 2);
        break;
      case Period.MONTHLY:
        today.setMonth(today.getMonth() - 2);
        break;
      case Period.YEARLY:
        today.setFullYear(today.getFullYear() - 2);
        break;
    }
    return Math.floor(today.getTime() / 1000);
  }, [period]);

  // fetch revenues for a year over 12 months
  const { revenueArray, isLoading: revenueIsLoading } = useGetRevenue({
    sponsor: hexToDecimal(address),
    since_date: aYearAgo.toString(),
    spacing: PeriodToSpacing[Period.MONTHLY],
  });

  // fetch revenues over selected period
  const {
    revenueArray: periodRevenueArray,
    isLoading: periodRevenueIsLoading,
  } = useGetRevenue({
    sponsor: hexToDecimal(address),
    since_date: sinceDate.toString(),
    spacing: PeriodToSpacing[period],
  });

  // fetch sales counts over selected period
  const { salesCount, isLoading: salesCountIsLoading } = useGetSalesCount({
    sponsor: hexToDecimal(address),
    since_date: sinceDate.toString(),
    spacing: PeriodToSpacing[period],
  });

  // fetch clicks counts over selected period
  const { clicksCount, isLoading: clicksCountIsLoading } = useGetClicks({
    sponsor: hexToDecimal(address),
    since_day: sinceDate.toString(),
    spacing: PeriodToSpacing[period],
  });

  const revenueOverview = useMemo(() => {
    if (periodRevenueArray && !periodRevenueIsLoading) {
      const diff = getDifference(periodRevenueArray);
      return {
        value: toReadablePrice(periodRevenueArray[1]).toString(),
        differenceInPercent: diff,
      };
    } else {
      return emptyOverview;
    }
  }, [periodRevenueArray]);

  const salesOverview = useMemo(() => {
    if (salesCount && !salesCountIsLoading) {
      const diff = getDifference(salesCount);
      return {
        value: toReadablePrice(salesCount[1]).toString(),
        differenceInPercent: diff,
      };
    } else {
      return emptyOverview;
    }
  }, [salesCount]);

  const clicksOverview = useMemo(() => {
    if (clicksCount && !clicksCountIsLoading) {
      const diff = getDifference(clicksCount);
      return {
        value: toReadablePrice(clicksCount[1]).toString(),
        differenceInPercent: diff,
      };
    } else {
      return emptyOverview;
    }
  }, [clicksCount]);

  const chartData = useMemo(() => {
    if (revenueArray) {
      const updatedArr = revenueArray.map((value) => toReadablePrice(value));
      return [
        {
          name: "Revenue",
          data: updatedArr,
        },
      ];
    }
  }, [period, revenueArray]);

  const periodLabel = useMemo(() => {
    const label = PeriodToDifferenceLabel[period];
    if (period === Period.DAILY) return `since ${label}`;
    return `in the ${label}`;
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
                <p className="text-micro">{`Hello ${domainOrAddress}, welcome to your dashboard`}</p>
                <p className="text-normal text-bold mt-2">{`You have earned ${revenueOverview.value} ETH ${periodLabel}`}</p>
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
                value={`${revenueOverview.value} ETH`}
                icon={<Paid />}
                differenceInPercent={revenueOverview.differenceInPercent}
                period={period}
              />
              <OverviewCard
                title="Number of domains purchased"
                value={`${salesOverview.value}`}
                icon={<CreditScoreRounded />}
                differenceInPercent={salesOverview.differenceInPercent}
                period={period}
              />
              <OverviewCard
                title="Number of clicks on the link"
                value={`${clicksOverview.value}`}
                icon={<Mouse />}
                differenceInPercent={clicksOverview.differenceInPercent}
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
                {!revenueIsLoading ? (
                  <LineChart
                    title="Revenue"
                    differenceInPercent={revenueOverview.differenceInPercent}
                    period={period}
                    chartData={chartData}
                  />
                ) : (
                  <p>is loadind</p>
                )}
              </div>
              <div className={`${analyticsStyle.card} mt-8`}>
                <RevenueCard
                  title="Revenue to claim"
                  revenue={toReadablePrice(remainingBalance)}
                />
                <ErrorOutline className="mt-5" />
                <p className="text-default my-2">
                  You can claim your income from 0.1 ETH
                </p>
                <div className={helper.col}>
                  <ClickableAction
                    icon={<Paid />}
                    title="Claim your income"
                    width="auto"
                    onClick={executeClaim}
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
