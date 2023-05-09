import { getToday } from "./words";

export function clearLocalStorage() {
  localStorage.clear();
}
export const getTimestampFromState = (gamedata) => {
  const {
    game: { timestamps },
  } = gamedata;
  return timestamps;
};
export const getLastPlayedTime = (gamedata) => {
  const timestamps = getTimestampFromState(gamedata);
  return timestamps.lastPlayed || Date.now();
};
export const updateGameState = (game, word, encodedWord) => {
  const newGameData = {
    ...game,
    enc: { ...encodedWord },
    wordList: [...game.wordList, word],
    timestamps: {
      ...game.timestamps,
      lastPlayed: Date.now(),
    },
  };
  return newGameData;
};
export const newDayReset = (gamedata) => {
  const time = getToday();
  return {
    ...gamedata,
    game: {
      ...gamedata.game,
      wordList: [],
      enc: {},
      timestamps: {
        ...gamedata.game.timestamps,
        lastPlayed: time.valueOf(),
      },
    },
  };
  // return newGameData;
};
