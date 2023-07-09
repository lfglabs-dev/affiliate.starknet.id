import { FC, ReactNode } from "react";
import Link from "next/link";
import ClickableAction from "./iconsComponents/clickableAction";
import styles from "../../styles/components/redirectionBlock.module.css";

interface RedirectionBlockProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonLogo: ReactNode;
  style?: "primary" | "secondary"
  displayLeaves?: boolean;
}

export const RedirectionBlock: FC<RedirectionBlockProps> = ({ title, description, buttonLink, buttonText, buttonLogo, style = "primary", displayLeaves = true }) => {

  return (
    <div className={`${styles.card} ${style === "primary" ? styles.primary : styles.secondary} flex rounded-lg p-6 px-8`}>
      <div className={`flex flex-col items-start text-white justify-start z-40`}>
        <h4>{title}</h4>
        <p className="text-small mt-5 mb-2 leading-6">{description}</p>
        <Link href={buttonLink}>
          <ClickableAction onClick={() => console.log('click')} title={buttonText} icon={buttonLogo} />
        </Link>
      </div>
      {displayLeaves && (
        <>
          <div className={styles.bottomLeftLeaf}>
            <img width="100%" alt="leaf" src="/leaves/new/leaf03.svg" />
          </div>
          <div className={styles.bottomLeftLeaf}>
            <img width="100%" alt="leaf" src="/leaves/new/leaf04.svg" />
          </div>
          <div className={`${styles.bottomRightLeaf} z-10`}>
            <img width="100%" alt="leaf" src="/leaves/new/leaf01.svg" />
          </div>
          <div className={`${styles.bottomRightLeaf2} z-20`}>
            <img width="100%" alt="leaf" src="/leaves/new/leaf02.svg" />
          </div>
        </>
      )}
    </div>
  )
}