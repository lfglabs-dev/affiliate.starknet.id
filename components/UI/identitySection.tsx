import { FC } from "react";
import { LOREM } from "../../mock/mock";
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
        <div className="p-10 py-5">
          <div className="flex flex-row items-center">
            <ColoredStarknetIcon width="16" />
            <p className="ml-1 text-micro">{domain}</p>
          </div>
          <h1 className={`${style.title} uppercase font-bold`}>Starknet.id</h1>
          <p className="text-small mb-4">Empower Your Earnings with StarknetID! Our contract-based referral system is your opportunity 
          to earn and contribute to the growth of the StarknetID ecosystem. Together, we can revolutionize the Web3 space.</p>
          <AffiliateLink link={affiliateLink} />
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
