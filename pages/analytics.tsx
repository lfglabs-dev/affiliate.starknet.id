import React, { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { Period } from "../types/metrics/types";
import { CustomSelect } from "../components/UI/customSelect";

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
        <div id="recap-section">
          <div className={`${helper.row} justify-around`}>
            <div className="flex flex-col justify-start items-start">
              <p>{`Hello ${username}, welcome to your dashboard`}</p>
              <p>{`You have earned $${revenue} in the last `}</p>
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
        <div id="overview-section">
        </div>
        <div id="analytics-section">
        </div>
      </ div>
    </div>);
};

export default Analytics;
