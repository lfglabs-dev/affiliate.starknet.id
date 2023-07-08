import { Level, LevelData } from "../types/level/types";


export const levelsRecord: Record<Level, LevelData> = {
  1: {
    level: 1,
    title: "Beginner",
    experienceRange: [0, 100],
    bonuses: [
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      }
    ],
  },
  2: {
    level: 2,
    title: "Lieutenant",
    experienceRange: [101, 200],
    bonuses: [
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      }
    ]
  },
  3: {
    level: 3,
    title: "Commando",
    experienceRange: [201, 300],
    bonuses: [
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      }
    ]
  },
  4: {
    level: 4,
    title: "Chad",
    experienceRange: [301, 400],
    bonuses: [
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      },
      {
        name: "Xp bonus"
      }
    ]
  },
}