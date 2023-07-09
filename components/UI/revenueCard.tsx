import { FC } from "react";

interface RevenueCardProps {
  title: string;
  revenue: number;
}
export const RevenueCard: FC<RevenueCardProps> = ({ title, revenue }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full rounded-md">
      <p>{title}</p>
      <p>${revenue}</p>
    </div>
  )
}