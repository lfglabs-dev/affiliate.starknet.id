import React, { useMemo } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { useAccount } from "@starknet-react/core";
import { IdentitySection } from "../components/UI/identitySection";
import { useDisplayName } from "../hooks/displayName";
import { LevelSection } from "../components/UI/levelSection";
import { RedirectionBlock } from "../components/UI/redirectionBlock";
import TelegramIcon from "../components/UI/iconsComponents/icons/telegramIcon";
import { FaqBoard } from "../components/UI/faq/faq";
import { faqData } from "../components/UI/faqData";
import DownloadIcon from "../components/UI/iconsComponents/icons/downloadIcon";
import Error from "./error";
import { getLevelStartTime } from "../utils/period";
import { useGetSalesCount } from "../hooks/metrics";
import { hexToDecimal } from "../utils/feltService";

const AffiliateSpace: NextPage = () => {
  const { address } = useAccount();

  const domainOrAddress = useDisplayName(address ?? "");

  const affiliateLink = `${process.env.NEXT_PUBLIC_APP_LINK}/?sponsor=${address}`;

  const FALLBACK_TOKEN_ID = 595564833601;

  const today = useMemo(() => Date.now(), [address]);
  const { since_date, spacing } = getLevelStartTime(today);
  const { salesCount, isLoading: salesCountIsLoading } = useGetSalesCount({
    sponsor: hexToDecimal(address),
    since_date: since_date.toString(),
    spacing: spacing.toString(),
  });

  const salesOverview = useMemo(() => {
    if (salesCount && !salesCountIsLoading) {
      return salesCount[0];
    } else {
      return 0;
    }
  }, [salesCount]);

  return (
    <div className={styles.screen}>
      {!address ? (
        <Error />
      ) : (
        <div className={styles.container}>
          <div id="domain-section" style={{ width: "100%" }}>
            <IdentitySection
              domain={domainOrAddress}
              affiliateLink={affiliateLink}
              tokenId={FALLBACK_TOKEN_ID}
            />
          </div>
          <div id="action-section" className="w-full mt-6">
            <div className={`${helper.row} justify-between gap-5 h-full`}>
              <div className={`${helper.col} lg:w-1/2`}>
                <LevelSection level={2} numberOfRegistrations={salesOverview} />
              </div>
              <div
                className={`${helper.col} ${styles.redirectionBlock} flex-1 flex-grow gap-7`}
              >
                <RedirectionBlock
                  title="Join Our Telegram Community"
                  description="Connect, Collaborate, and Conquer! Share your strategies, learn from others, and build a strong network of StarknetID sponsors. Together, we can achieve more"
                  buttonText="Go to telegram channel"
                  buttonLink="https://discord.gg/2YHSAQJ" //to change
                  buttonLogo={<TelegramIcon width="28px" color="white" />}
                  style="secondary"
                  displayLeaves={false}
                  buttonLogoBackgroundColor="#229ED9"
                />
                <RedirectionBlock
                  title="Marketing Toolkit at Your Fingertips"
                  description="Get access to a range of resources designed to help you succeed.
                From eye-catching graphics to effective communication strategies, we've got you covered."
                  buttonText="Download Toolkit"
                  buttonLink="https://discord.gg/2YHSAQJ" //to change
                  buttonLogo={<DownloadIcon width="28px" />}
                />
              </div>
            </div>
          </div>
          <div id="faq-section" className="mt-8 w-full">
            <FaqBoard faq={faqData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateSpace;
