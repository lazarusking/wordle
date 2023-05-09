import { createContext, useContext, useEffect, useRef, useState } from "react";
import { game } from "../constants/game";
import { settings } from "../constants/settings";
import useLocalStorage from "../hooks/useLocalStorage";
import { getLastPlayedTime, newDayReset } from "../utils/localStorage";
import { getRandomWord, isNextDay } from "../utils/words";

const StorageContext = createContext({
  gameSettings: settings,
  // setTheme: () => null,
  gamedata: game,
  randomWord: "",
  setRandomWord: () => null,
  setGameSettings: () => null,
  setGameData: () => null,
});
export function useStorageContext() {
  return useContext(StorageContext);
}
export function StorageProvider({ children }) {
  const [gamedata, setGameData] = useLocalStorage("gamedata", game);
  const [gameSettings, setGameSettings] = useLocalStorage("settings", settings);
  const [randomWord, setRandomWord] = useState(() => getRandomWord());

  const prefersColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  /** To not include the full gameSettings object as a dependency
   *  for the useEffect, Double NOT operator is used to force
   * gameSettings.darkMode to its boolean primitive since a NOT operator
   *  will force the condition on dark mode only(in case gameSettings
   * doesn't exist darkMode would be undefined) */
  useEffect(() => {
    if (
      gameSettings.darkMode ||
      (!!gameSettings.darkMode && prefersColorScheme)
    ) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
    gameSettings.colorblindMode
      ? document.documentElement.classList.add("high-contrast")
      : document.documentElement.classList.remove("high-contrast");
  }, [prefersColorScheme, gameSettings.darkMode, gameSettings.colorblindMode]);

  const previousTimeStamp = getLastPlayedTime(gamedata);
  const nextDay = useRef(isNextDay(previousTimeStamp));
  // console.log(isNextDay(previousTimeStamp),previousTimeStamp,nextDay);
  if (nextDay.current) {
    console.log("This changed or so!", nextDay);
    // const resetState = newDayReset(gamedata);
    setGameData((gamedata) => newDayReset(gamedata));
  }

  const value = {
    settings: gameSettings,
    setGameSettings,
    gamedata,
    randomWord,
    setRandomWord,
    setGameData,
  };
  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
