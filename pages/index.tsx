import React, { useMemo } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { useAccount } from "@starknet-react/core";
import { IdentitySection } from "../components/UI/identitySection";
import { useDisplayName } from "../hooks/displayName.tsx";

const AffiliateSpace: NextPage = () => {
  const { address } = useAccount();

  const domainOrAddress = useDisplayName(address ?? "")

  const affiliateLink = "https://starknet.id";

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div id="domain-section" style={{ border: '1px solid blue', minHeight: '33%', width: '100%' }}>
          <IdentitySection domain={domainOrAddress} affiliateLink={affiliateLink} tokenId={1} />
        </div>
        <div id="action-section" style={{ border: '1px solid blue', minHeight: '33%', width: '100%' }}>
          <div className={helper.row}>
            <div className={helper.box}></div>
            <div className={helper.col}>
              <div className={helper.box}></div>
              <div className={helper.box}></div>
            </div>
          </div>
        </div>
        <div id="faq-section" style={{ border: '1px solid blue', minHeight: '33%', width: '100%' }}></div>
      </div>
    </div>
  );
};

export default AffiliateSpace;
