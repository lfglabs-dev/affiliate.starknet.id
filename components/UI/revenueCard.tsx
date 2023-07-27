import { FC } from "react";
import style from "../../styles/components/revenueCard.module.css";

interface RevenueCardProps {
  title: string;
  revenue: number;
}
export const RevenueCard: FC<RevenueCardProps> = ({ title, revenue }) => {
  return (
    <div className={style.card}>
      <p>{title}</p>
      <h1>${revenue}</h1>
      <>
        <div className={style.topLeftLeaf}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf04.svg" />
        </div>
        <div className={style.topLeftLeaf2}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf03.svg" />
        </div>
        <div className={style.topRightLeaf}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf04.svg" />
        </div>
        <div className={style.topRightLeaf2}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf01.svg" />
        </div>
        <div className={style.bottomLeftLeaf}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf03.svg" />
        </div>
        <div className={style.bottomLeftLeaf}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf04.svg" />
        </div>
        <div className={`${style.bottomRightLeaf} z-10`}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf01.svg" />
        </div>
        <div className={`${style.bottomRightLeaf2} z-20`}>
          <img width="100%" alt="leaf" src="/leaves/new/leaf04.svg" />
        </div>
      </>
    </div>
  );
};
