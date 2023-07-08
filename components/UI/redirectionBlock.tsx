import { FC, ReactNode, useCallback } from "react";
import helper from "../../styles/components/helper.module.css";
import Button from "./button";
import Link from "next/link";
import ClickableAction from "./iconsComponents/clickableAction";

interface RedirectionBlockProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonLogo: ReactNode;
  backgroundColor?: string;
}

export const RedirectionBlock: FC<RedirectionBlockProps> = ({ title, description, buttonLink, buttonText, buttonLogo, backgroundColor }) => {

  return (
    <div className={`${helper.col} rounded-lg`}>
      <p>{title}</p>
      <p className="self-start">{description}</p>
      <Link href={buttonLink}>
        {/* <ClickableAction onClick={() => console.log('click')}>
          <div className="flex flex-row justify-center items-center">
            {buttonLogo}
            <p>{buttonText}</p>
          </div>
        </ClickableAction> */}
        <ClickableAction onClick={() => console.log('click')} title={buttonText} icon={buttonLogo} />
      </Link>
    </div>
  )
}