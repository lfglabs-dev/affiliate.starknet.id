import { FC, useCallback, useState } from "react";
import style from "../../styles/components/affiliateLink.module.css";
import { Button } from "@mui/base";
import CopyIcon from "./iconsComponents/icons/copyIcon";

interface AffiliateLinkProps {
  link: string;
  domain: string;
}

export const AffiliateLink: FC<AffiliateLinkProps> = ({ link, domain }) => {
  const [copied, setCopied] = useState(false);
  const linkToShow = `https://app.starknet.id/${domain}`;

  const handleClick = useCallback(() => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [link]);

  return (
    <Button className={`${style.button} ml-[-0.5rem] mt-4 min-h-[30px] h-[30px]`} onClick={handleClick}>
      <p className="text-default lg:mr-2 mr-1">
        {linkToShow.substring(8, linkToShow.length)}
      </p>
      {copied ? (
        <span className="text-xs font-bold">Copied!</span>
      ) : (
        <CopyIcon width="25" />
      )}
    </Button>
  );
};
