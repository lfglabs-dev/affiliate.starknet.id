import { FC, useState, useMemo, useEffect } from "react";
import { AffiliateLink } from "./affiliateLink";
import style from "../../styles/components/identitySection.module.css";
import ColoredStarknetIcon from "./iconsComponents/icons/coloredStarknetIcon";
import DollarIconLB from "./iconsComponents/icons/dollarIconLB";
import InfoIcon from "./iconsComponents/icons/infoIcon";
import AffiliateButton from "./affiliateButton";
import DownloadButtonLBIcon from "./iconsComponents/icons/downloadButtonLB";
import { useAccount, useSendTransaction } from "@starknet-react/core";
import { useRemainingBalance } from "../../hooks/metrics";
import { toReadablePrice } from "../../utils/priceService";
import { gweiToEth, hexToDecimal } from "../../utils/feltService";

interface IdentitySectionProps {
  domain: string;
  affiliateLink: string;
  tokenId: number;
}

const downloadMediaKit = () => {
  // Create a link element
  const link = document.createElement("a");

  // Set the link's href to the file's path
  link.href = "/affiliationMediaKit.zip";

  // Set the download attribute to the desired file name
  link.download = "affiliationMediaKit.zip";

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger the download by simulating a click on the link
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export const IdentitySection: FC<IdentitySectionProps> = ({
  domain,
  affiliateLink,
  tokenId,
}) => {
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
    <div className="flex flex-col justify-center mx-auto max-w-[1184px] gap-6 md:flex-row">
      <div className={`${style.section} col-span-3`}>
        <div>
          <div className="p-10 py-5">
            <div className="flex flex-row items-center">
              <ColoredStarknetIcon width="16" />
              <p className="ml-1 text-micro">{domain}</p>
            </div>
            <h1 className={`${style.title} uppercase font-bold`}>
              THE STARK AFFILIATE <span className="text-primary">PROGRAM</span>
            </h1>
            <p className="mb-4 text-small">
              Earn <span className="text-bold">25%</span> commission in ETH on
              sales through your referral link, plus up to{" "}
              <span className="text-bold">25%</span> extra from your referrals’
              revenue.
            </p>
            <AffiliateLink link={affiliateLink} domain={domain} />
          </div>
        </div>
      </div>

      <div className="col-span-2 space-y-4">
        <div className={`${style.card} ${style.bgAirBalloons} py-2`}>
          <div className="flex items-center justify-between w-full h-full py-[17px] px-[20px]">
            <div className="">
              <div className="flex items-center">
                <p className={`mr-2 font-normal text-small ${style.subtitle}`}>
                  Your unclaimed revenue
                </p>
                <div className={`${style.handCursor} relative group`}>
                  <InfoIcon width="20" />
                  <div className="absolute hidden group-hover:block bg-[#454545] text-white p-3 rounded-lg text-small -right-7 -top-7 translate-x-full w-48 text-left z-50">
                    This is the amount your affiliate link generated since you
                    last claimed, You can claim your revenue once you reach 0.1
                    ETH.
                  </div>
                </div>
              </div>
              <h1 className={`text-grey-600 uppercase font-bold`}>
                {remainingBalance}
                <span className="pl-2 text-small">ETH</span>
              </h1>
            </div>
            <div>
              <AffiliateButton
                onClick={canClaim ? executeClaim : undefined}
                title={canClaim ? "ClAIM" : "Nothing to claim"}
                icon={<DollarIconLB />}
                style={canClaim ? "primary" : "disabled"}
                wrapperClassName="w-fit text-center"
                titleClassName={!canClaim ? "text-[11px]" : ""}
              />
            </div>
          </div>
        </div>

        <div className={`${style.card} ${style.bgPalmTrees} py-2`}>
          <div className="flex items-center justify-between w-full h-full py-[17px] px-[20px]">
            <div className="">
              <div className="flex items-center">
                <p className={`mr-2 font-normal text-small ${style.subtitle}`}>
                  Marketing toolkit
                </p>
                <div className={`${style.handCursor} relative group`}>
                  <InfoIcon width="20" />
                  <div className="absolute hidden group-hover:block bg-[#454545] text-white p-3 rounded-lg text-small -right-7 -top-7 translate-x-full w-48 text-left z-50">
                    Get access to a range of resources designed to help you
                    succeed. From eye-catching graphics to effective
                    communication strategies, we've got you covered.
                  </div>
                </div>
              </div>
              <h1 className={`text-grey-600  font-bold`}>
                23<span className="pl-2 text-small">items</span>
              </h1>
            </div>
            <div>
              <AffiliateButton
                onClick={() => downloadMediaKit()}
                title={"DOWNLOAD"}
                icon={<DownloadButtonLBIcon />}
                style="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
