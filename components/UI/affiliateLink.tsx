import { FC, useCallback, useState } from "react";
import style from "../../styles/components/affiliateLink.module.css";
import { Button } from "@mui/base";
import CopyIcon from "./iconsComponents/icons/copyIcon";
import theme from "../../styles/theme";
import CopiedIcon from "./iconsComponents/icons/copiedIcon";

interface AffiliateLinkProps {
  link: string;
  domain: string;
}

export const AffiliateLink: FC<AffiliateLinkProps> = ({ link, domain }) => {
  const [copied, setCopied] = useState(false);
  const linkToShow = `${process.env.NEXT_PUBLIC_APP_LINK}/${domain}`;

  const handleClick = useCallback(() => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, [link]);

  return (
    <Button
      className={`${style.button} ml-[-0.5rem] mt-4 min-h-[30px] h-[30px] bg-[--affiliate-card-bg]`}
      onClick={handleClick}
    >
      <p className="text-small lg:mr-2 mr-1 text-[--grey]">
        {linkToShow.substring(8, linkToShow.length)}
      </p>
      {copied ? (
        <CopiedIcon width="18" color={theme.palette.primary.main} />
      ) : (
        <CopyIcon width="18" color={theme.palette.primary.main} />
      )}
    </Button>
  );
};
