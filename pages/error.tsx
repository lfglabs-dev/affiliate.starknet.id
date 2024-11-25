import React, { FunctionComponent } from "react";
import styles from "../styles/Home.module.css";
import errorStyle from "../styles/components/error.module.css";


const NotFound: FunctionComponent = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={errorStyle.main}>
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/visuals/errorillu.webp" 
            alt="error illustration"
            height={300} 
            width={300}
          />
          <div className="text-center">
            <h1 className="title text-center">Oh no... access error!</h1>
            <p className="mt-2">To access to your stark affiliate space you need to connect to a
            starknet wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
