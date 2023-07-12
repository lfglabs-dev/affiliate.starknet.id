import { FC } from "react";
import { Bonus } from "../../types/level/types";
import { Check, Lock } from "@mui/icons-material";
import style from "../../styles/components/levelBonusMessage.module.css";

interface LevelBonusMessageProps {
  bonus: Bonus;
  isDone: boolean;
  isLocked?: boolean;
}

export const LevelBonusMessage: FC<LevelBonusMessageProps> = ({
  bonus,
  isDone,
  isLocked,
}) => {
  return (
    <div className="flex flex-row items-center justify-start">
      {isLocked && <Lock fontSize="small" color="disabled" />}
      {isDone && !isLocked && (
        <div className={style.button}>
          <Check fontSize="inherit" />
        </div>
      )}
      <p className="text-micro ml-4 leading-loose">{bonus.name}</p>
    </div>
  );
};
