import { FC, useEffect, useMemo, useState } from "react";
import ClickableAction from "./iconsComponents/clickableAction";
import styles from "../../styles/components/redirectionBlock.module.css";
import { useRemainingBalance } from "../../hooks/metrics";
import { toReadablePrice } from "../../utils/priceService";
import { Paid } from "@mui/icons-material";
import { gweiToEth, hexToDecimal } from "../../utils/feltService";
import { useAccount, useSendTransaction } from "@starknet-react/core";

export const RevenueBlock: FC = () => {
  // Balance to claim
  const { address } = useAccount();
  const { balance, error } = useRemainingBalance(hexToDecimal(address) ?? "0");
  const [canClaim, setCanClaim] = useState(false);
  const remainingBalance = useMemo(() => {
    if (!balance || error) return 0;
    return toReadablePrice(Number(balance));
  }, [balance]);
  useEffect(() => {
    if (!balance || error) setCanClaim(false);
    else if (
      Number(balance) === 0 ||
      Number(gweiToEth(balance.toString())) < 0.1
    )
      setCanClaim(false);
    else setCanClaim(true);
  }, [balance, error]);

  const { sendAsync: executeClaim } = useSendTransaction({
		calls: [
			{
				contractAddress: process.env.NEXT_PUBLIC_REFERRAL_CONTRACT as string,
				entrypoint: "claim",
				calldata: [],
			},
		],
	});

  
  return (
    <div
      className={`${styles.revenueCard} ${styles.secondary} flex flex-1 flex-grow rounded-lg p-6 px-8`}
    >
      <img
        src="https://www.starknet.id/visuals/affiliates/moneyIllu.webp"
        alt="claim"
        width={400}
      />
      <div className={`flex flex-col items-start justify-start z-40`}>
        <h4>{`Your unclaimed revenue is ${remainingBalance} ETH`}</h4>
        <p className="text-small mt-5 mb-2 leading-6">
          This is the amount your affiliate link generated since you last
          claimed, You can claim your revenue once you reach 0.1 ETH.
        </p>
        <ClickableAction
          icon={<Paid />}
          title={canClaim ? "Claim your income" : "Not enough income"}
          onClick={canClaim ? executeClaim : undefined}
          style={canClaim ? "primary" : "disabled"}
        />
      </div>
    </div>
  );
};
