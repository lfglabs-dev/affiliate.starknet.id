import { FC, useCallback } from "react";

interface AffiliateLinkProps {
  link: string;
}

export const AffiliateLink: FC<AffiliateLinkProps> = ({ link }) => {

  const handleClick = useCallback(() => {
    if (!link) return;
    navigator.clipboard.writeText(link);
  }, [link]);

  return (
    <div className="flex flex-row items-center justify-center py-2 cursor-pointer rounded-sm" onClick={handleClick}>
      <h1>affiliate.starknet.id</h1>
    </div>
  );
}