import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { useAccount } from "@starknet-react/core";
import { IdentitySection } from "../components/UI/identitySection";
import { useDisplayName } from "../hooks/displayName";
import { LevelSection } from "../components/UI/levelSection";
import { RedirectionBlock } from "../components/UI/redirectionBlock";
import DiscordIcon from "../components/UI/iconsComponents/icons/discordIcon";
import { FaqBoard } from "../components/UI/faq/faq";
import { faqData } from "../mock/faqData";
import DownloadIcon from "../components/UI/iconsComponents/icons/downloadIcon";

const AffiliateSpace: NextPage = () => {
  const { address } = useAccount();

  const domainOrAddress = useDisplayName(address ?? "")

  const affiliateLink = "https://starknet.id";

  const FALLBACK_TOKEN_ID = 595564833601

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div id="domain-section" style={{ width: '100%' }}>
          <IdentitySection domain={domainOrAddress} affiliateLink={affiliateLink} tokenId={FALLBACK_TOKEN_ID} />
        </div>
        <div id="action-section" className="w-full mt-6">
          <div className={`${helper.row} justify-between gap-5 h-full`}>
            <div className={`${helper.col} lg:w-1/2`}>
              <LevelSection level={2} numberOfRegistrations={167}/>
            </div>
            <div className={`${helper.col} ${styles.redirectionBlock} flex-1 flex-grow gap-7`}>
              <RedirectionBlock 
                title="Join us in our discord channel"
                description="Connect with our vibrant community of like-minded individuals and industry professionals in our active Discord channel.
                Engage in discussions, share insights, and stay-up to date with the latest trends and developments in our field. Join the conversation and unlock a world of networking opportunities and collaborative possibilities"
                buttonText="Go to discord channel"
                buttonLink="https://discord.gg/2YHSAQJ"
                buttonLogo={<DiscordIcon width="28px" color="white" />}
                style="secondary"
                displayLeaves={false}
                buttonLogoBackgroundColor="#6371F2"
              />
              <RedirectionBlock
                title="Access our valuable collection of assets"
                description="Get instant access to a curated selection of top-quality assets. Download and elevate your projects with ease.
                Boost your creativity and achieve outstanding results."
                buttonText="Download Assets"
                buttonLink="https://discord.gg/2YHSAQJ"
                buttonLogo={<DownloadIcon width="28px" />}
              />
            </div>
          </div>
        </div>
        <div id="faq-section" className="mt-8 w-full">
          <FaqBoard faq={faqData}/>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSpace;
