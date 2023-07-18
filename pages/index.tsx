import React from "react";
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

const AffiliateSpace: NextPage = () => {
  const { address } = useAccount();

  const domainOrAddress = useDisplayName(address ?? "");

  const affiliateLink = "https://starknet.id";

  const FALLBACK_TOKEN_ID = 595564833601;

  return (
    <div className={styles.screen}>
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
              <LevelSection level={2} numberOfRegistrations={167} />
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
                buttonLogoBackgroundColor="#6371F2"
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
    </div>
  );
};

export default AffiliateSpace;
