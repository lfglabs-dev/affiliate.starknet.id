import React, { FunctionComponent, ReactNode } from "react";
import styles from "../../styles/components/affiliateButton.module.css";

type AffiliateButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  description?: string;
  style?: "primary" | "secondary" | "disabled";
  logoBackgroundColor?: string;
  wrapperClassName?: string;
};

const AffiliateButton: FunctionComponent<AffiliateButtonProps> = ({
  icon,
  onClick,
  title,
  description,
  style = "secondary",
  logoBackgroundColor,
  wrapperClassName = "",
}) => {
  return (
    <div
      className={`${
        style === "disabled"
          ? styles.clickableActionDisabled
          : styles.clickableActionPrimary
      } ${wrapperClassName}`}
      onClick={onClick}
    >
      <div className={`${styles.clickableIconPrimary}`}>{icon}</div>

      <div className="ml-3">
        <h1 className={styles.clickableActionTitle}>{title}</h1>
        <p className={styles.clickableActionDescription}>{description}</p>
      </div>
    </div>
  );
};

export default AffiliateButton;
