export interface Game {
  game: {
    // rowNum: 0,
    wordList: [];
    enc: Array<number>;
    currentRowIndex: 0;
    status: "IN_PROGRESS";
    timestamps: {
      lastPlayed: number;
      lastCompleted: number;
    };
  };
  stats: {
    currentStreak: 0;
    bestStreak: 0;
    guesses: {
      1: 0;
      2: 0;
      3: 0;
      4: 0;
      5: 0;
      6: 0;
    };
    winPercentage: 0;
    gamesPlayed: 0;
    gamesWon: 0;
    averageGuesses: 0;
    isOnStreak: false;
    hasPlayed: false;
  };
  timestamp: number;
}
export const game: Game = {
  game: {
    wordList: [],
    enc: [],
    currentRowIndex: 0,
    status: "IN_PROGRESS",
    timestamps: {
      lastPlayed: 0,
      lastCompleted: 0,
    },
  },
  stats: {
    currentStreak: 0,
    bestStreak: 0,
    guesses: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    winPercentage: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    averageGuesses: 0,
    isOnStreak: false,
    hasPlayed: false,
  },
  timestamp: Date.now(),
};
