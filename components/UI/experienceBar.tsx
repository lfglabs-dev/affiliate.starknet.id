import { FC } from "react";
import helper from "../../styles/components/helper.module.css";

interface ExperienceBarProps {
  experienceInPercent: number;
  currentLevelLabel: string;
  nextLevelLabel: string;
}

export const ExperienceBar: FC<ExperienceBarProps> = ({ experienceInPercent, currentLevelLabel, nextLevelLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-64 h-1 bg-green-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${experienceInPercent}%` }}
        ></div>
      </div>
      <div className="flex flew-row items-center justify-between w-full">
        <p>{currentLevelLabel}</p>
        <p>{nextLevelLabel}</p>
      </div>
    </div>
  );
}