import React, { useCallback, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ClickableAction from "../components/UI/iconsComponents/clickableAction";
import { Logout } from "@mui/icons-material";
import errorStyle from "../styles/components/error.module.css";
import { useRouter } from "next/router";
import { useAccount } from "@starknet-react/core";
import { useDomainFromAddress } from "../hooks/naming";

const Error: NextPage = () => {

  const router = useRouter();

  // const { address } = useAccount();

  // const { hasDomain } = useDomainFromAddress(address);

  // useEffect(() => {
  //   if (hasDomain) {
  //     router.push("/affiliate");
  //   }
  // }, [hasDomain, router]);

  const handleOnClick = useCallback(() => {
    router.push("https://app.starknet.id/")
  }, [router]);

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={errorStyle.main}>
          <h2>Oh no... access error!</h2>
          <p className="text-small mt-8">To access to your stark affiliate space you need to connect to a starknet wallet</p>
          <div className="mt-8">
            <ClickableAction title="Register a domain" icon={<Logout />} onClick={handleOnClick}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
