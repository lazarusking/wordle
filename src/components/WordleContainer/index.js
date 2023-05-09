import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useStorageContext } from "../../contexts/StorageContext";
import { getRandomWord } from "../../utils/words";
import { ShuffleIcon } from "../svg/Shuffle";
import Wrapper from "./Wrapper";
function setCurrentElement(ref, gamedata, isDailyMode) {
  const rows = ref.current;
  let wordList;
  if (isDailyMode) {
    ({ wordList } = gamedata.game);
  } else {
    wordList = gamedata;
  }
  const rowNum = wordList.length;
  const row = rows.children[rowNum];
  // console.log(wordList, row, rowNum);
  return row;
}
export default function WordleContainer({
  isDailyMode,
  gamedata,
  setGameData,
  randomWord,
  // setRandomWord,
  ...props
}) {
  const ref = useRef(null);
  const [parentElement, setParentElement] = useState(null);
  const [element, setElement] = useState(null);
  const [text, setText] = useState("");
  // let pointerClass;

  const { setRandomWord, settings, setGameSettings } = useStorageContext();
  function resetRandom(e) {
    if (isDailyMode) return;
    setRandomWord(getRandomWord());
    setGameData([]);
    setText("");
    e.currentTarget.blur();
  }

  const gameOver = props.gameStatus[1];

  useEffect(() => {
    if (!gameOver && ref.current) {
      const parent = setCurrentElement(ref, gamedata, isDailyMode);
      setParentElement(parent);
      // setElement(parent.children[0]);
      // console.log("parent props changing");
    } else {
      // setElement(null);
      setParentElement(null);
    }
  }, [gameOver, gamedata, isDailyMode]);

  return (
    <>
      {/* <input type={"text"} value={text} readOnly /> */}

      {/* <Toggle
        isTrue={isDailyMode}
        toggleFunc={() => {
          const t = settings.dailyMode ? false : true;
          setGameSettings({ ...settings, dailyMode: t });
        }}
        label={"random"}
      /> */}
      <div className="flex justify-between items-center py-1 px-4 lg:pr-16 xl:pl-10">
        <button
          aria-label="Change Mode"
          className={`hover:bg-blue-300 p-1.5 rounded`}
          onClick={(e) => {
            // e.preventDefault()
            const t = settings.dailyMode ? false : true;
            setGameSettings({ ...settings, dailyMode: t });
            e.currentTarget.blur();
          }}
        >
          <ArrowPathIcon title="Change mode" className="w-6 h-6" />
        </button>
        {!isDailyMode && (
          <button
            className="hover:bg-blue-300 p-1.5 rounded"
            aria-label="Get new word"
            onClick={(e) => resetRandom(e)}
          >
            <ShuffleIcon title="Get new word" className="w-6 h-6" />
          </button>
        )}
      </div>

      <Wrapper
        ref={ref}
        gamedata={gamedata}
        text={[text, setText]}
        randomWord={randomWord}
        isDailyMode={isDailyMode}
        game={[gamedata, setGameData]}
        parent={parentElement}
        el={element}
        setEl={setElement}
        {...props}
      />
    </>
  );
}
