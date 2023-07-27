export const MAX_LEVEL = 4;

export type Level = 1 | 2 | 3 | 4;

export type LevelData = {
  level: number;
  title: string;
  experienceRange: [number, number];
  bonuses: Bonus[];
};

export type Bonus = {
  name: string;
};
