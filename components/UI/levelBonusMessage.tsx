import { FC } from "react";
import { Bonus } from "../../types/level/types"
import { CheckBox, Lock } from "@mui/icons-material";

interface LevelBonusMessageProps {
  bonus: Bonus;
  isDone: boolean;
  isLocked?: boolean;
}

export const LevelBonusMessage: FC<LevelBonusMessageProps> = ({ bonus, isDone, isLocked }) => {
  return (
    <div className="flex flex-row items-center justify-start">
      {isLocked && (
        <Lock fontSize="small" />
      )}
      {isDone && !isLocked && (
        <CheckBox fontSize="small" color="success" />
      )}
      <p className="text-sm">{bonus.name}</p>
    </div>
  );
}