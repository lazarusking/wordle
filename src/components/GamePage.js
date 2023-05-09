import { useCallback, useEffect, useRef, useState } from "react";
import { WIN_MESSAGES } from "../constants/strings";
import { useAlertContext } from "../contexts/AlertContext";
import { useStorageContext } from "../contexts/StorageContext";
import { isGameWonOrOver, solution } from "../utils/words";
import Alert from "./Alert";
import NavModalContainer from "./navbar/NavModalContainer";
import WordleContainer from "./WordleContainer";

export default function GamePage() {
  const [modal, setModal] = useState(null);
  const { gamedata, randomWord, setRandomWord, settings, setGameData } =
    useStorageContext();
  const { displayNotification, clearNotification } = useAlertContext();
  const [randomState, setRandomState] = useState([]);
  const [size] = useState(5);
  const [wordGuessCount] = useState(6);
  // const [gameLoad, setGameLoad] = useState(false);
  const hasWon = useRef(false);
  let wordList, gameStatus;
  if (settings.dailyMode) {
    ({ wordList } = gamedata.game);
    // console.log(wordList);
    gameStatus = isGameWonOrOver(wordGuessCount, gamedata);
  } else {
    wordList = randomState;
    gameStatus = isGameWonOrOver(wordGuessCount, wordList, randomWord);
  }
  const isGameWon = gameStatus[0];
  const isGameOver = gameStatus[1];
  // console.log(isGameWon);
  const winNotification = useCallback(() => {
    displayNotification(
      WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)],
      "success",
      {
        onFinish: () => {
          if (settings.dailyMode) {
            setTimeout(() => {
              setModal("stat");
            }, 2000);
          }
        },
      }
    );
  }, [displayNotification, settings.dailyMode]);

  const loseNotification = useCallback(() => {
    const word = settings.dailyMode ? solution : randomWord;
    displayNotification(`The word was ${word}`, "error");
  }, [displayNotification, randomWord, settings.dailyMode]);

  useEffect(() => {
    // if (!gameLoad) return setGameLoad(true);
    if (isGameWon && (!hasWon.current || !settings.dailyMode)) {
      hasWon.current = true;

      return winNotification();
    }
    if (isGameOver) {
      loseNotification();
    }

    return () => {
      clearNotification();
    };
  }, [
    clearNotification,
    gamedata,
    isGameOver,
    isGameWon,
    loseNotification,
    settings.dailyMode,
    winNotification,
  ]);
  useEffect(() => {
    !localStorage.getItem("gamedata") && setModal("info");
  }, []);
  // useEffect(() => {
  //   if (isGameWon) {
  //     const textToShare = generateEmojiGrid(
  //       solution,
  //       wordList,
  //       getEmojiTiles(settings.darkMode, settings.colorBlindMode)
  //     );
  //     // setGameWon(true);
  //     console.log(textToShare);
  //   }
  // }, [isGameWon, settings.colorBlindMode, settings.darkMode, wordList]);

  return (
    <>
      <NavModalContainer
        modal={modal}
        setModal={setModal}
        gameStatus={gameStatus}
        wordGuessCount={wordGuessCount}
        gamedata={wordList}
      />
      <Alert />
      <div className="rounded-lg text-xs info-shade mx-auto p-1 px-2">
        {settings.dailyMode ? "Daily Mode" : "Random Mode"}
      </div>
      <WordleContainer
        wordGuessCount={wordGuessCount}
        size={size}
        isDailyMode={settings.dailyMode}
        gameStatus={gameStatus}
        randomWord={randomWord}
        setRandomWord={setRandomWord}
        gamedata={settings.dailyMode ? gamedata : randomState}
        setGameData={settings.dailyMode ? setGameData : setRandomState}
      />
    </>
  );
}
