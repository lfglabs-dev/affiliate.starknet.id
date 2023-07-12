import { FC, useCallback, useMemo, useState } from "react";
import { levelsRecord } from "../../mock/levelsData";
import { Level, MAX_LEVEL } from "../../types/level/types";
import { ExperienceBar } from "./experienceBar";
import { HexagonalBox } from "./hexagonalBox";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Lock,
} from "@mui/icons-material";
import { LevelBonusMessage } from "./levelBonusMessage";
import style from "../../styles/components/levelSection.module.css";

interface LevelSectionProps {
  level: number;
  numberOfRegistrations: number; // equivalent to experience
}

export const LevelSection: FC<LevelSectionProps> = ({
  level,
  numberOfRegistrations,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>(level as Level);

  const levelData = useMemo(() => {
    return levelsRecord[level as Level];
  }, [level]);

  const experienceProgressionInPercent = useMemo(() => {
    const [minXp, maxXp] = levelData.experienceRange;
    const experience =
      ((numberOfRegistrations - minXp) / (maxXp - minXp)) * 100;
    return experience;
  }, [levelData, numberOfRegistrations]);

  const levelLabel = useMemo(() => {
    return selectedLevel === level ? `My level` : `Level ${selectedLevel}`;
  }, [level, selectedLevel]);

  const handleOnChangeLevel = useCallback(
    (level: Level) => {
      setSelectedLevel(level);
    },
    [setSelectedLevel]
  );

  const currentLevelLabel = useMemo(() => {
    return `${numberOfRegistrations} registrations`;
  }, [numberOfRegistrations]);

  const nextLevelLabel = useMemo(() => {
    if (selectedLevel + 1 === MAX_LEVEL) return `Max level`;
    return `${levelData.experienceRange[1]} to level ${selectedLevel + 1}`;
  }, [selectedLevel, levelData]);

  const hexagonalBoxContent = useMemo(() => {
    if (level === selectedLevel) {
      return <h1>{selectedLevel}</h1>;
    }
    return <Lock />;
  }, [level, selectedLevel]);

  return (
    <div className={style.section}>
      <div className={style.innerCard}>
        <h4 className="mb-5">{levelLabel}</h4>
        <HexagonalBox content={hexagonalBoxContent} />
        <p className="text-small mt-5">{levelData.title}</p>

        <ExperienceBar
          experienceInPercent={experienceProgressionInPercent}
          currentLevelLabel={currentLevelLabel}
          nextLevelLabel={nextLevelLabel}
        />
        <div className="flex flex-row w-1/4 justify-center items-center gap-6 mt-5">
          {selectedLevel - 1 > 0 && (
            <div
              className={style.button}
              onClick={() => handleOnChangeLevel((selectedLevel - 1) as Level)}
            >
              <KeyboardArrowLeft fontSize="small" />
            </div>
          )}
          {selectedLevel + 1 <= MAX_LEVEL && (
            <div
              className={style.button}
              onClick={() => handleOnChangeLevel((selectedLevel + 1) as Level)}
            >
              <KeyboardArrowRight fontSize="small" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col items-start w-full">
        <p className="text-micro">Your total registration</p>
        <h1 className="mt-2">{numberOfRegistrations}</h1>
        <div className="mt-5 flex flex-col gap-6">
          {levelData.bonuses.map((bonus) => (
            <LevelBonusMessage
              key={bonus.name}
              bonus={bonus}
              isDone={true}
              isLocked={selectedLevel > level}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
