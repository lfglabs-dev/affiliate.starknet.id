import { FC } from "react";
import { AffiliateLink } from "./affiliateLink";
import style from "../../styles/components/identitySection.module.css";
import ColoredStarknetIcon from "./iconsComponents/icons/coloredStarknetIcon";

interface IdentitySectionProps {
  domain: string;
  affiliateLink: string;
  tokenId: number;
}

export const IdentitySection: FC<IdentitySectionProps> = ({
  domain,
  affiliateLink,
  tokenId,
}) => {
  return (
    <div className={style.section}>
      <div className={style.column}>
        <div className="px-5 py-6">
          <div className="flex flex-row items-center">
            <ColoredStarknetIcon width="16" />
            <p className="ml-1 text-micro">{domain}</p>
          </div>
          <h1 className={`${style.title} uppercase font-bold tracking-wide leading-normal`}>
            THE STARK AFFILIATE <span className={style.accent}>PROGRAM</span>
          </h1>
          <p className={`${style.paragraph} text-small max-w-[58ch]`}>
            Earn <span className={style.commission}><strong>25%</strong></span> commission in ETH on sales through your referral link, plus up to <span className={style.commission}><strong>25%</strong></span> extra from your referrals’ revenue.
          </p>
          <AffiliateLink link={affiliateLink} domain={domain} />
        </div>
      </div>
      <div className={style.column}>
        <div className={style.hexagon}>
          <img
            src={`${process.env.NEXT_PUBLIC_STARKNET_ID}/api/identicons/${tokenId}`}
            width="100%"
            height="100%"
            alt="identicon"
          />
        </div>
      </div>
    </div>
  );
};
