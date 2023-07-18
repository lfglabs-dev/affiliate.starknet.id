import { FC, useCallback, useState } from "react";
import style from "../../styles/components/affiliateLink.module.css";
import { ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/base";
import CopiedIcon from "./iconsComponents/icons/copiedIcon";
import theme from "../../styles/theme";

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
    <Button className={style.button} onClick={handleClick}>
      <p className="text-default mr-2">
        {linkToShow.substring(8, linkToShow.length)}
      </p>
      {copied ? (
        <CopiedIcon width="25" color={theme.palette.primary.main} />
      ) : (
        <ContentCopy width="25" />
      )}
    </Button>
  );
};
