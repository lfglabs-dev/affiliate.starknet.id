import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { Period } from "../types/metrics/types";
import { CustomSelect } from "../components/UI/customSelect";
import { OverviewCard } from "../components/UI/overviewCard";
import { ErrorOutline, Paid } from "@mui/icons-material";
import { LineChart } from "../components/UI/lineChart";
import { RevenueCard } from "../components/UI/revenueCard";
import ClickableAction from "../components/UI/iconsComponents/clickableAction";

const Analytics: NextPage = () => {
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);

  const periods = [
    Period.DAILY,
    Period.WEEKLY,
    Period.MONTHLY,
    Period.YEARLY,
  ]

  const username = "Benjamin";
  const revenue = 1000;
  const numberOfDomainPurchased = 30;
  const numberOfClicksOnLink = 1200;

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div id="recap-section" className="w-full">
          <div className={`${helper.row} justify-between w-full`}>
            <div className="flex flex-col justify-start items-start">
              <p className="text-micro">{`Hello ${username}, welcome to your dashboard`}</p>
              <p className="text-normal font-bold mt-2">{`You have earned $${revenue} in the last `}</p>
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
            <OverviewCard title="Revenue" value={`$${revenue}`} icon={<Paid />} differenceInPercent={55} period={period}/>
            <OverviewCard title="Number of domains purchased" value={`${numberOfDomainPurchased}`} icon={<Paid />} differenceInPercent={-5} period={period}/>
            <OverviewCard title="Number of clicks on the link" value={`${numberOfClicksOnLink}`} icon={<Paid />} differenceInPercent={55} period={period}/>
          </div>
        </div>
        <div id="analytics-section" className="w-full">
          <div className={helper.row}>
            <div className={helper.row}>
              <LineChart title="Revenue" subtitle="Revenue over time"/>
            </div>
            <div className={helper.col}>
              <RevenueCard title="Revenue to claim" revenue={revenue} />
              <ErrorOutline />
              <p>You can claim your income from $200</p>
              <div className={helper.row}>
                <ClickableAction 
                  icon={<Paid />}
                  title="Claim your income"
                />
              </div>
            </div>
          </div>
        </div>
      </ div>
    </div>);
};

export default Analytics;
