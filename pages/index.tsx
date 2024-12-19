import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import helper from "../styles/components/helper.module.css";
import { useAccount } from "@starknet-react/core";
import { IdentitySection } from "../components/UI/identitySection";
import { useDisplayName } from "../hooks/displayName";
import { RedirectionBlock } from "../components/UI/redirectionBlock";
import TelegramIcon from "../components/UI/iconsComponents/icons/telegramIcon";
import { FaqBoard } from "../components/UI/faq/faq";
import { faqData } from "../components/UI/faqData";
import DownloadIcon from "../components/UI/iconsComponents/icons/downloadIcon";
import Error from "./error";
import { getLevelStartTime } from "../utils/period";
import { gweiToEth, hexToDecimal } from "../utils/feltService";
import { RevenueBlock } from "../components/UI/revenueBlock";
import { Paid } from "@mui/icons-material";
// import { LevelSection } from "../components/UI/levelSection";

const AffiliateSpace: NextPage = () => {
	const { address } = useAccount();
	const domainOrAddress = useDisplayName(address ?? "");
	const affiliateLink = `${process.env.NEXT_PUBLIC_APP_LINK}/?sponsor=${address}`;
	const FALLBACK_TOKEN_ID = 595564833601;
	const [salesOverview, setSalesOverview] = useState<number>(0);

	const today = useMemo(() => Date.now(), [address]);
	const { since_date, spacing } = getLevelStartTime(today);
	useEffect(() => {
		if (!address) return;
		fetch(`${process.env.NEXT_PUBLIC_API_URL}referral/sales_count?sponsor=${hexToDecimal(address)}&since_date=${since_date.toString()}&spacing=${spacing.toString()}`)
			.then((response) => response.json())
			.then((result) => {
				if (result && result.counts) {
					setSalesOverview(result.counts[0]);
				}
			})
			.catch((error) => {
				console.log("An error occured while fetching user revenue", error);
			});
	}, [address]);

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

	return (
		<div className={styles.screen}>
			{!address ? (
				<Error />
			) : (
				<div className={styles.container}>
					<div
						id="domain-section"
						style={{ width: "100%" }}>
						<IdentitySection
							domain={domainOrAddress}
							affiliateLink={affiliateLink}
							tokenId={FALLBACK_TOKEN_ID}
						/>
					</div>
					<div
						id="faq-section"
						className="mt-8 w-full">
						<FaqBoard faq={faqData} />
					</div>
				</div>
			)}
		</div>
	);
};

export default AffiliateSpace;
