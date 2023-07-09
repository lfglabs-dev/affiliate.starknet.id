import React, { useMemo } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { useAccount } from "@starknet-react/core";
import { IdentitySection } from "../components/UI/identitySection";
import { useDisplayName } from "../hooks/displayName";
import { LevelSection } from "../components/UI/levelSection";
import { RedirectionBlock } from "../components/UI/redirectionBlock";
import DiscordIcon from "../components/UI/iconsComponents/icons/discordIcon";
import { Download } from "@mui/icons-material";
import { FaqBoard } from "../components/UI/faq/faq";
import { faqData } from "../mock/faqData";

const AffiliateSpace: NextPage = () => {
  const { address } = useAccount();

  const domainOrAddress = useDisplayName(address ?? "")

  const affiliateLink = "https://starknet.id";

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div id="domain-section" style={{ border: '1px solid blue', width: '100%' }}>
          <IdentitySection domain={domainOrAddress} affiliateLink={affiliateLink} tokenId={1} />
        </div>
        <div id="action-section" style={{ border: '1px solid blue', width: '100%' }}>
          <div className={helper.row}>
            <div className={helper.col}>
              <LevelSection level={2} numberOfRegistrations={167}/>
            </div>
            <div className={helper.col}>
              <div className={helper.box}>
                <RedirectionBlock 
                  title="Join us in our discord channel"
                  description="Connect with our vibrant community of like-minded individuals and industry professionals in our active Discord channel.
                  Engage in discussions, share insights, and stay-up to date with the latest trends and developments in our field. Join the conversation and unlock a world of networking opportunities and collaborative possibilities"
                  buttonText="Go to discord channel"
                  buttonLink="https://discord.gg/2YHSAQJ"
                  buttonLogo={<DiscordIcon width="16px" color="white" />}
                />
              </div>
              <div className={helper.box}>
                <RedirectionBlock 
                  title="Access our valuable collection of assets"
                  description="Get instant access to a curated selection of top-quality assets. Download and elevate your projects with ease.
                  Boost your creativity and achieve outstanding results."
                  buttonText="Download Assets"
                  buttonLink="https://discord.gg/2YHSAQJ"
                  buttonLogo={<Download width="16px" />}
                />
              </div>
            </div>
          </div>
        </div>
        <div id="faq-section" style={{ border: '1px solid blue', width: '100%' }}>
          <FaqBoard faq={faqData}/>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSpace;
