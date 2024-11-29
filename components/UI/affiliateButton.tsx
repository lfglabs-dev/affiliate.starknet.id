import React, { FunctionComponent, ReactNode } from "react";
import styles from "../../styles/components/affiliateButton.module.css";

type AffiliateButtonProps = {
	icon: ReactNode;
	onClick?: () => void;
	title?: string;
	description?: string;
	style?: "primary" | "secondary" | "disabled";
	logoBackgroundColor?: string;
};

const AffiliateButton: FunctionComponent<AffiliateButtonProps> = ({ icon, onClick, title, description, style = "secondary", logoBackgroundColor }) => {
	return (
		<div
			className={`${style === "disabled" ? styles.clickableActionDisabled : styles.clickableActionPrimary}
        w-fit`}
			onClick={onClick}>
			<div className={styles.clickableIconPrimary}>{icon}</div>

			<div className="ml-2">
				<h1 className={styles.clickableActionTitle}>{title}</h1>
				<p className={styles.clickableActionDescription}>{description}</p>
			</div>
		</div>
	);
};

export default AffiliateButton;
