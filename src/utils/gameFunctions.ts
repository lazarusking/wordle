import { MutableRefObject } from "react";
import { KeyboardElement, KeyboardReactInterface } from "react-simple-keyboard";
import { Game } from "../constants/game";
import { updateGameState } from "./localStorage";
import { addStatsForCompletedGame } from "./stats";
import { isWinningWord, solution } from "./words";

export function getLocalStorage() {
  if (!localStorage.getItem("gamedata")) {
    const data = {
      rowNum: 0,
      words: {},
      curElement: [],
    };
    localStorage.setItem("gamedata", JSON.stringify(data));
  }
  const data: Game = JSON.parse(localStorage.getItem("gamedata") || "{}");
  return data;
}
export function colorWordleCell(letterState) {
  // console.log(typeof letterState);
  switch (Number(letterState)) {
    case 0:
      return "absent";
    case 1:
      return "exists";
    case 2:
      return "correct";
    default:
      return "absent";
  }
}
export function decodeToString(encode: number, size: number) {
  return encode?.toString(3).padStart(size, "0");
}

export function colorKeyboardKeys(
  gamedata: Array<string>,
  size: number,
  solution: string,
  keyboard: MutableRefObject<KeyboardReactInterface>
) {
  try {
    // const { wordList: listOfStrings, enc: encodedStrings } = gamedata;
    const listOfStrings = gamedata;
    const hMap = letterChecker(solution);

    for (let index = 0; index < listOfStrings.length; index++) {
      const word = listOfStrings[index];

      // const enc = encodedStrings[index];
      // const decodedString = decodeToString(enc, size);
      for (let j = 0; j < word.length; j++) {
        const letter = word[j];
        // const decoded = decodedString[j];
        // const colorStat = colorWordleCell(decoded);

        const letterState = wordClassifier(letter, j + 1, hMap);
        const colorState = colorWordleCell(letterState);
        console.log(letterState, colorState);

        const keyboardElement = keyboard.current.getButtonElement(
          letter
        ) as KeyboardElement;
        keyboardElement.classList.add(colorState);
        console.log(keyboardElement);

      }
    }
  } catch (e) {
    return;
  }
}
export function buildColorString(gamedata: string, solution?: string) {
  try {
    // const { wordList: listOfStrings, enc: encodedStrings } = gamedata;
    const word = gamedata;
    const radixData: Array<number> = [];

    const hMap = letterChecker(solution);
    // console.log(hMap);
    for (let j = 0; j < word.length; j++) {
      const letter = word[j];
      const letterState = wordClassifier(letter, j + 1, hMap);
      radixData.push(letterState);
    }
    const baseWord = radixData.join("");
    return baseWord;
  } catch (e) {
    return;
  }
}
export function addClassToElement(
  parentElement: HTMLElement,
  className: string,
  timer = 0
) {
  setTimeout(() => {
    parentElement.classList.add(className);
  }, timer);
  parentElement.classList.remove(className);
}
export function randomWordChecker(
  input: string,
  gamedata: Array<string>,
  randomWord: string
) {
  const radixData: Array<number> = [];

  const hMap = letterChecker(randomWord);

  for (let index = 0; index < input.length; index++) {
    const cellLetter = input[index];
    if (cellLetter) {
      //compares input values with hMap and assigns rank 0,1,2

      const letterState = wordClassifier(cellLetter, index + 1, hMap);
      radixData.push(letterState);
      // const colorState = colorWordleCell(letterState);

      // el.classList.toggle(colorState);
      // keyboard layout is lowercase but made capitalized with css
      // const keyboardElement = keyboard.current.getButtonElement(
      //   cellLetter
      // ) as KeyboardElement;
      // console.log(cellLetter, colorState, keyboardElement);

      // keyboardElement.classList.add(colorState);
    }
  }
  const wordList = [...gamedata, input];
  return wordList;
}

export function wordChecker(input: string, gamedata: Game, GAMELIMIT: number) {
  // const wordClassifier = function (cellLetter: string, index: number) {
  //   //letter is, 0 absent , 1 exists, 2 correct
  //   let state: number;
  //   if (hMap[cellLetter]) {
  //     // if typed letter exists in wordle
  //     // console.log(cellLetter, hMap[cellLetter], index);
  //     // typedWordMap[cellLetter] = 1;
  //     hMap[cellLetter].includes(index) ? (state = 2) : (state = 1);
  //   } else {
  //     state = 0;
  //   }
  //   return state;
  // };
  let { stats, game } = gamedata;
  const { enc: typedWordMap, wordList } = game;
  const rowNum = wordList.length;
  const radixData: Array<number> = [];

  for (let index = 0; index < input.length; index++) {
    const cellLetter = input[index];
    if (cellLetter) {
      //compares input values with hMap and assigns rank 0,1,2

      const letterState = wordClassifier(cellLetter, index + 1);
      radixData.push(letterState);
      // const colorState = colorWordleCell(letterState);
      // el.classList.toggle(colorState);
      // keyboard layout is lowercase but made capitalized with css
      // const keyboardElement: KeyboardElement =
      //   keyboard.current.getButtonElement(cellLetter) as KeyboardElement;
      // keyboardElement.classList.add(colorState);
    }
  }
  const word = input;
  const baseWord = radixData.join("");
  typedWordMap[rowNum] = parseInt(baseWord, 3);

  //check if word is the winning word
  // set the appropriate stats if it is
  //
  game = updateGameState(game, word, typedWordMap);

  if (isWinningWord(word)) {
    stats = addStatsForCompletedGame(stats, rowNum + 1, GAMELIMIT);
    game.timestamps.lastCompleted = Date.now();
  } else if (rowNum + 1 === GAMELIMIT) {
    stats = addStatsForCompletedGame(stats, GAMELIMIT + 1, GAMELIMIT);
  }
  //if word couldnt be guessed, set appropriate stats
  // update timestamps

  gamedata = {
    ...gamedata,
    game: {
      ...game,
    },
    stats: { ...stats },
  };

  console.log(gamedata);
  return gamedata;
}

export function letterChecker(customSol?: string) {
  const hMap: Map<string, number[]> = new Map();
  const wordle = customSol || solution;

  for (let i = 0; i < wordle.length; i++) {
    const letter = wordle[i];
    const index = hMap.get(letter);
    // console.debug(letter, index);
    if (index || index == 0) {
      // console.debug(letter, index);
      const newIndex: Array<number> = [];
      newIndex.push(...index, i + 1);
      // hMap[letter] = newIndex;
      hMap.set(letter, newIndex);

      continue;
    }
    hMap.set(letter, [i + 1]);
  }
  return hMap;
}
// const hMap = letterChecker();
export const wordClassifier = function (
  cellLetter: string,
  index: number,
  solutionMap?: Map<string, number[]>
) {
  //letter is, 0 absent , 1 exists, 2 correct

  // const hMap = letterChecker(solution);
  const hMap = solutionMap || letterChecker();
  let state: number;
  // console.log(hMap);

  if (hMap.get(cellLetter)) {
    // if typed letter exists in wordle
    // console.log(cellLetter, hMap[cellLetter], index);
    // typedWordMap[cellLetter] = 1;
    hMap.get(cellLetter)?.includes(index) ? (state = 2) : (state = 1);
  } else {
    state = 0;
  }
  return state;
};

