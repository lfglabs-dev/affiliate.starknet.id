import { FC, ReactNode } from "react";
import style from  "../../styles/components/hexagonalBox.module.css"

interface HexagonalBoxProps {
  content: ReactNode;
  color?: string;
}

export const HexagonalBox: FC<HexagonalBoxProps> = ({ content, color }) => {
  return (
    <div className={style.hexagonBox} style={{ backgroundColor: color }}>
      <div className={style.hexagonBoxInner}>
        {content}
      </div>
    </div>
  );
};