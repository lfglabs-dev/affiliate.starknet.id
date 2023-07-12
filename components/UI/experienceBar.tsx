import { FC } from "react";

interface ExperienceBarProps {
  experienceInPercent: number;
  currentLevelLabel: string;
  nextLevelLabel: string;
}

export const ExperienceBar: FC<ExperienceBarProps> = ({
  experienceInPercent,
  currentLevelLabel,
  nextLevelLabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 w-10/12">
      <div className="w-full h-1 bg-green-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${experienceInPercent}%` }}
        ></div>
      </div>
      <div className="flex flew-row items-center justify-between w-full mt-1">
        <p className="text-small">{currentLevelLabel}</p>
        <p className="text-small">{nextLevelLabel}</p>
      </div>
    </div>
  );
};
