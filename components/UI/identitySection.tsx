import { FC } from "react";
import { AffiliateLink } from "./affiliateLink";
import style from "../../styles/components/identitySection.module.css";
import ColoredStarknetIcon from "./iconsComponents/icons/coloredStarknetIcon";
import DollarIcon from "./iconsComponents/icons/dollarIcon";
import InfoIcon from "./iconsComponents/icons/infoIcon";
import AffiliateButton from "./affiliateButton";
import DownloadButtonIcon from "./iconsComponents/icons/downloadButton";

interface IdentitySectionProps {
	domain: string;
	affiliateLink: string;
	tokenId: number;
}

export const IdentitySection: FC<IdentitySectionProps> = ({ domain, affiliateLink, tokenId }) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
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
						<p className="text-small mb-4">
							Earn <span className="text-bold">25%</span> commission in ETH on sales through your referral link, plus up to <span className="text-bold">25%</span> extra from your referrals’ revenue.
						</p>
						<AffiliateLink
							link={affiliateLink}
							domain={domain}
						/>
					</div>
				</div>
			</div>

			<div className="col-span-2 space-y-4">
				<div className={`${style.card} ${style.bgAirBalloons} py-2`}>
					<div className="flex h-full items-center justify-between w-full pr-7">
						<div className="p-5 ">
							<div className="flex items-center">
								<p className="text-small mr-2">Your unclaimed revenue</p>
								<div className={`${style.handCursor} relative group`}>
									<InfoIcon width="20" />
									<div className="absolute hidden group-hover:block bg-[#454545] text-white p-3 rounded-lg text-small -right-7 -top-7 translate-x-full w-48 text-left z-50">This is the amount your affiliate link generated since you last claimed, You can claim your revenue once you reach 0.1 ETH.</div>
								</div>
							</div>
							<h1 className={` uppercase font-bold`}>
								0.048<span className="text-small pl-2">ETH</span>
							</h1>
						</div>
						<div onClick={() => window.open("https://desktop.telegram.org/")}>
							<AffiliateButton
								onClick={() => console.log("click")}
								title={"CLAIM"}
								icon={
									<DollarIcon
										width="16px"
										color="white"
									/>
								}
								// style="secondary"
								logoBackgroundColor={"#fff"}
							/>
						</div>
					</div>
				</div>

				<div className={`${style.card} ${style.bgPalmTrees} py-2`}>
					<div className="flex h-full items-center justify-between w-full pr-1 lg:pr-7">
						<div className="p-5 ">
							<div className="flex items-center">
								<p className="text-small mr-2">Marketing toolkit</p>{" "}
								<div className={`${style.handCursor} relative group`}>
									<InfoIcon width="20" />
									<div className="absolute hidden group-hover:block bg-[#454545] text-white p-3 rounded-lg text-small -right-7 -top-7 translate-x-full w-48 text-left z-50">Get access to a range of resources designed to help you succeed. From eye-catching graphics to effective communication strategies, we've got you covered.</div>
								</div>
							</div>
							<h1 className={`  font-bold`}>
								23<span className="text-small pl-2">items</span>
							</h1>
						</div>
						<div onClick={() => window.open("https://desktop.telegram.org/")}>
							<AffiliateButton
								onClick={() => console.log("click")}
								title={"DOWNLOAD"}
								icon={
									<DownloadButtonIcon
										width="16px"
										color="white"
									/>
								}
								style="secondary"
								logoBackgroundColor={"#fff"}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
