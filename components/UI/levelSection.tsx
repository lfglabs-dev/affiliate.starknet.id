import { FC, useCallback, useMemo, useState } from "react";
import { levelsRecord } from "../../mock/levelsData";
import { Level, MAX_LEVEL } from "../../types/level/types";
import helper from "../../styles/components/helper.module.css";
import { Button } from "@mui/material";
import { ExperienceBar } from "./experienceBar";
import { HexagonalBox } from "./hexagonalBox";
import { Lock } from "@mui/icons-material";
import { LevelBonusMessage } from "./levelBonusMessage";

interface LevelSectionProps {
  level: number;
  numberOfRegistrations: number; // equivalent to experience
}

export const LevelSection: FC<LevelSectionProps> = ({ level, numberOfRegistrations }) => {
  const [selectedLevel, setSelectedLevel] = useState<Level>(level as Level);

  const levelData = useMemo(() => {
    return levelsRecord[level as Level]
  }, [level])

  const experienceProgressionInPercent = useMemo(() => {
    const [minXp, maxXp] = levelData.experienceRange
    const experience =  ((numberOfRegistrations - minXp) / (maxXp - minXp)) * 100
    console.log(experience);
    return experience
  }, [levelData, numberOfRegistrations])

  const levelLabel = useMemo(() => {
    return selectedLevel === level ? `My level` : `Level ${selectedLevel}`
  }, [level, selectedLevel])

  const handleOnChangeLevel = useCallback((level: Level) => {
    setSelectedLevel(level);
  }, [setSelectedLevel])

  const currentLevelLabel = useMemo(() => {
    return `${numberOfRegistrations} registrations`
  }, [numberOfRegistrations])

  const nextLevelLabel = useMemo(() => {
    if(selectedLevel + 1 === MAX_LEVEL) return `Max level`
    return `${levelData.experienceRange[1]} to level ${selectedLevel + 1}`
  }, [levelData])

  const hexagonalBoxContent = useMemo(() => {
    if(level === selectedLevel) {
      return (
        <p>{selectedLevel}</p>
      )
    }
    return (
      <Lock />
    )
  }, [level, selectedLevel])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p>{levelLabel}</p>
        <HexagonalBox content={hexagonalBoxContent} />
        <ExperienceBar 
          experienceInPercent={experienceProgressionInPercent} 
          currentLevelLabel={currentLevelLabel} 
          nextLevelLabel={nextLevelLabel}/>
        <div className={helper.row}>
          {selectedLevel - 1 > 0 && (
            <Button onClick={() => handleOnChangeLevel((selectedLevel - 1) as Level)}>{'<'}</Button>
          )}
          {selectedLevel + 1 <= MAX_LEVEL && (
            <Button onClick={() => handleOnChangeLevel((selectedLevel + 1) as Level)}>{'>'}</Button>
          )}
        </div>
      </div>
      <div className="mt-3">
        <p>Your total registration</p>
        <p>{numberOfRegistrations}</p>
        {levelData.bonuses.map(bonus => <LevelBonusMessage bonus={bonus} isDone={true} isLocked={selectedLevel > level}/>)}
      </div>
    </div>
  )
}