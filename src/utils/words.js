import { addDays, differenceInDays, startOfDay, startOfToday } from "date-fns";
import { VALID_GUESSES } from "../constants/validGuesses";
import { WORDS } from "../constants/wordList";

export const getToday = () => {
  return startOfToday();
};
// 1 January 2022 Game Epoch
export const firstGameDate = new Date(2023, 5);
export const periodInDays = 1;

export const isWordInWordList = (word) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase())
  );
};

export const isWinningWord = (word) => {
  // const solution = "LLAMA";
  return solution === word;
};

export const getLastGameDate = (today) => {
  const t = startOfDay(today);
  const daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays;
  return addDays(t, -daysSinceLastGame);
};
export const getNextGameDate = (today) => {
  return addDays(getLastGameDate(today), periodInDays);
};
export const getIndex = (gameDate) => {
  let start = firstGameDate;
  let index = -1;
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);
  return index;
};
export const getWordOfDay = (index) => {
  if (index < 0) {
    throw new Error("Invalid Index");
  }
  return WORDS[index % WORDS.length].toLocaleUpperCase();
};
export const getSolution = (gameDate) => {
  const nextGameDate = getNextGameDate(gameDate);
  const index = getIndex(gameDate);
  const wordOfTheDay = getWordOfDay(index);
  return {
    solution: wordOfTheDay,
    solutionIndex: index,
    tomorrow: nextGameDate,
  };
};
export const { solution, solutionIndex, tomorrow } = getSolution(getToday());

export const isGameWonOrOver = (size, gamedata, customSolution) => {
  const wordList = "game" in gamedata ? gamedata.game.wordList : gamedata;
  // const { rowNum, wordList } = gamedata.game;

  // if ((rowNum && wordList.length == size) || wordList.includes(solution)) {
  return [
    wordList.includes(customSolution || solution),
    wordList.length === size,
  ];
  // if (
  //   wordList.length == size ||
  //   wordList.includes(customSolution || solution)
  // ) {
  //   return true;
  // }
  // return false;
};
export const isNextDay = (timestamp) => {
  // console.info(tomorrow, tomorrow.valueOf());
  if (getToday() > timestamp) {
    return true;
  }
  return false;
};
export const getRandomWord = () => {
  const index = Math.floor(Math.random() * WORDS.length);
  return getWordOfDay(index);
};
export function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// export const hardModeCheck = (word, guesses, size = 5) => {
//   const baseDecode = enc[index];
//   const decodedString = decodeToString(baseDecode, size) || null;
//   // const { wordList, enc } = gamedata.game;
//   //!Todo
// };
