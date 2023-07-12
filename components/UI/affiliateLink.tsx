import { FC, useCallback } from "react";
import style from "../../styles/components/affiliateLink.module.css";
import { ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/base";

interface AffiliateLinkProps {
  link: string;
}

export const AffiliateLink: FC<AffiliateLinkProps> = ({ link }) => {
  const handleClick = useCallback(() => {
    if (!link) return;
    navigator.clipboard.writeText(link);
  }, [link]);

  return (
    <Button className={style.button} onClick={handleClick}>
      <p className="text-default mr-2">affiliate.starknet.id</p>
      <ContentCopy />
    </Button>
  );
};
