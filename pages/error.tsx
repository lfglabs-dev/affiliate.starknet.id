import React, { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";
import errorStyle from "../styles/components/error.module.css";

const Error: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={errorStyle.main}>
        <h2>Oh no... access error!</h2>
        <p className="text-small mt-8">
          To access to your stark affiliate space you need to connect to a
          starknet wallet
        </p>
      </div>
    </div>
  );
};

export default Error;
