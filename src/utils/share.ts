import {
  colorWordleCell,
  letterChecker,
  wordClassifier,
} from "./gameFunctions";
import { solutionIndex } from "./words";

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  return guesses
    .map((guess) => {
      const hMap = letterChecker(solution);
      const newTiles: string[] = [];
      for (let i = 0; i < guess.length; i++) {
        const letterState = wordClassifier(guess[i], i + 1, hMap);
        const status = colorWordleCell(letterState);
        switch (status) {
          case "correct":
            newTiles.push(tiles[0]);
            break;
          case "exists":
            newTiles.push(tiles[1]);
            break;
          default:
            newTiles.push(tiles[2]);
            break;
        }
      }
      return newTiles.join("");
    })
    .join("\n");
};
export const getEmojiTiles = (
  isDarkMode: boolean,
  isHighContrastMode: boolean
) => {
  let tiles: string[] = [];
  tiles.push(isHighContrastMode ? "🟧" : "🟩");
  tiles.push(isHighContrastMode ? "🟦" : "🟨");
  tiles.push(isDarkMode ? "⬛" : "⬜");
  return tiles;
};

export const shareStatus = (
  solution: string,
  wordList: string[],
  count: number,
  isGameOver: boolean,
  display: Function,
  darkMode: boolean,
  colorBlindMode: boolean
) => {
  const textToShare =
    `Wordle ${solutionIndex} ${
      isGameOver ? "X" : wordList.length
    }/${count} \n\n` +
    generateEmojiGrid(
      solution,
      wordList,
      getEmojiTiles(darkMode, colorBlindMode)
    );
  const shareData = { text: textToShare };

  let shareSuccess = false;

  try {
    if (
      navigator.canShare &&
      navigator.canShare(shareData) &&
      navigator.share
    ) {
      navigator.share(shareData);
      shareSuccess = true;
    }
  } catch (error) {
    shareSuccess = false;
  }

  try {
    if (!shareSuccess) {
      if (navigator.clipboard) {
        console.log("clipboard");

        navigator.clipboard
          .writeText(textToShare)
          .then(display("Copied to clipboard", "success"));
      } else {
        display("Error copying to clipboard");
      }
    }
  } catch (error) {
    // display("Error sharing");
  }
};
