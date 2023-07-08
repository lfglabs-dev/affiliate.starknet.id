import { FC } from "react";
import helper from "../../styles/components/helper.module.css";
import { Avatar } from "@mui/material";
import StarknetIcon from "./iconsComponents/icons/starknetIcon";
import { LOREM } from "../../mock/mock";
import { AffiliateLink } from "./affiliateLink";

interface IdentitySectionProps {
  domain: string;
  affiliateLink: string;
  tokenId: number;
}

export const IdentitySection: FC<IdentitySectionProps> = ({ domain, affiliateLink, tokenId }) => {
  
  return (
    <div className={helper.row}>
      <div className={`${helper.col}`}>
        <div className={helper.row}>
          <StarknetIcon width="16" />
          <p className="ml-1">{domain}</p>
        </div>
        <p className="uppercase font-bold">Starknet.id</p>
        <p className="justify-self-start">{LOREM}</p>
        <AffiliateLink link={affiliateLink} />
      </div>
      <div className={helper.box}>
        <img
          src={`${process.env.NEXT_PUBLIC_STARKNET_ID}/api/identicons/${tokenId}`}
          height={170}
          width={170}
          alt="identicon"
        />
      </div>
    </div>
  )
}