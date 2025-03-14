"use client";

import React, { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";
import errorStyle from "../styles/components/error.module.css";
import ConnectWalletButton from "../components/UI/ConnectWalletButton";

const NotFound: FunctionComponent = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={errorStyle.main}>
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className={errorStyle.error_title}>
              Connect Your Starknet Wallet
            </h1>
            <p className={errorStyle.error_desc_title}>
              To access your stark affiliate space, you need to connect to a
              starknet wallet
            </p>

            <div className="flex justify-center mt-6">
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
