import { FC } from "react";
import helper from "../../styles/components/helper.module.css";
import StarknetIcon from "./iconsComponents/icons/starknetIcon";
import { LOREM } from "../../mock/mock";
import { AffiliateLink } from "./affiliateLink";
import style from "../../styles/components/identitySection.module.css";

interface IdentitySectionProps {
  domain: string;
  affiliateLink: string;
  tokenId: number;
}

export const IdentitySection: FC<IdentitySectionProps> = ({ domain, affiliateLink, tokenId }) => {
  
  return (
    <div className={style.section}>
      <div className="flex flex-col justify-center items-start w-1/2">
        <div className="p-8">
          <div className="flex flex-row items-center">
            <StarknetIcon width="16" />
            <p className="ml-1 text-micro">{domain}</p>
          </div>
          <h1 className="uppercase font-bold">Starknet.id</h1>
          <p className="text-small mb-4">{LOREM}</p>
          <AffiliateLink link={affiliateLink} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2">
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
  )
}