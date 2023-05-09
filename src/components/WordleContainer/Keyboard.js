import { useCallback, useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useAlertContext } from "../../contexts/AlertContext";

import {
  addClassToElement,
  // colorKeyboardKeys,
  colorWordleCell,
  letterChecker,
  randomWordChecker,
  wordChecker,
  wordClassifier,
} from "../../utils/gameFunctions";

import { isWordInWordList, solution } from "../../utils/words";

export default function KeyboardComponent({
  parent,
  isDailyMode,
  wordGuessCount: LIMIT,
  randomWord,
  gameStatus,
  ...props
}) {
  const [layout] = useState("caps");
  const { displayNotification } = useAlertContext();
  const [gamedata, setGameData] = props.game;
  const [input, setInput] = props.text;

  let wordList;

  if ("game" in gamedata) {
    wordList = gamedata.game.wordList;
  } else {
    wordList = gamedata;
  }

  const [, setElement] = useState(props.el);
  const keyboard = useRef();
  // useEffect(() => {
  //   console.info("colored", wordList);
  //   colorKeyboardKeys(
  //     wordList,
  //     props.size,
  //     isDailyMode ? solution : randomWord,
  //     keyboard
  //   );
  //   return () => {
  //     colorKeyboardKeys(
  //       wordList,
  //       props.size,
  //       isDailyMode ? solution : randomWord,
  //       keyboard
  //     );
  //   };
  // });
  const getButtonTheme = (solution) => {
    const buttonTheme = [];
    const correctLetters = [];
    const existsLetters = [];
    const absentLetters = [];
    const listOfStrings = wordList;
    const hMap = letterChecker(solution);

    for (let index = 0; index < listOfStrings.length; index++) {
      const word = listOfStrings[index];
      for (let j = 0; j < word.length; j++) {
        const letter = word[j];
        const letterState = wordClassifier(letter, j + 1, hMap);
        const colorState = colorWordleCell(letterState);
        // console.log(letterState, colorState);
        switch (colorState) {
          case "correct":
            correctLetters.push(letter);
            break;
          case "exists":
            existsLetters.push(letter);
            break;
          default:
            absentLetters.push(letter);
            break;
        }
      }
    }
    correctLetters.length &&
      buttonTheme.push({ class: "correct", buttons: correctLetters.join(" ") });
    existsLetters.length &&
      buttonTheme.push({ class: "exists", buttons: existsLetters.join(" ") });
    absentLetters.length &&
      buttonTheme.push({ class: "absent", buttons: absentLetters.join(" ") });

    return buttonTheme;
  };
  const enterHandle = useCallback(() => {
    // if (!element) return;
    if (gameStatus[0] || gameStatus[1]) return;
    if (input.length < props.size) {
      console.log("not enough");
      addClassToElement(parent, "jiggle");
      return displayNotification("Not enough letters");
    }
    if (isWordInWordList(input)) {
      isDailyMode
        ? setGameData(wordChecker(input, gamedata, LIMIT))
        : setGameData(randomWordChecker(input, gamedata, randomWord));

      setInput("");
      // setElement(null);
      keyboard.current.clearInput();
      return;
    } else {
      addClassToElement(parent, "jiggle");

      return displayNotification("Word not found");
    }
  }, [
    LIMIT,
    displayNotification,
    gameStatus,
    gamedata,
    input,
    isDailyMode,
    parent,
    props.size,
    randomWord,
    setGameData,
    setInput,
  ]);

  const charHandle = useCallback(
    (button) => {
      // if (gameWon || gameRandomWon) return;
      if (gameStatus[0] || gameStatus[1]) return;

      if (input.length < props.size) {
        const val = button;

        setInput((prev) => prev + val);
      }
    },
    [gameStatus, input.length, props.size, setInput]
  );

  const deleteHandle = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));

    // console.debug(element);
  }, [setInput]);
  useEffect(() => {
    // console.info("props changing");
    // console.debug(solution, solutionIndex, tomorrow);
    // const parent = setCurrentElement(props, gamedata);
    // setParentElement(props.parent);
    setElement(parent?.children[0]);
    setInput("");
  }, [parent, setInput]);

  useEffect(() => {
    const keyListener = (e) => {
      if (e.code === "Backspace") {
        deleteHandle();
      } else if (e.code === "Enter") {
        // console.log(document.hasFocus());
        if (document.body === document.activeElement) {
          enterHandle();
        }
      } else {
        const key = e.key.toLocaleUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          charHandle(key);
        }
      }
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [charHandle, deleteHandle, enterHandle]);

  const onKeyReleased = (button) => {
    switch (button) {
      case "{backspace}": {
        deleteHandle();

        break;
      }
      case "{enter}":
        {
          enterHandle();
          // setCurrentElement();
        }
        break;
      default:
        {
          charHandle(button);
        }
        break;
    }

    // console.debug(keyboard.current.getAllInputs());
    // console.debug("Input changed", input);
  };

  return (
    <div className="sm:max-w-2xl w-full mx-auto">
      {/* <input
          value={input}
          readOnly
          placeholder={"Tap on the virtual keyboard to start"}
          // onChange={onChangeInput}
        /> */}
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{backspace} z x c v b n m {enter}",
          ],
          caps: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{enter} Z X C V B N M {backspace}",
          ],
        }}
        display={{
          "{backspace}": `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"></path>
        </svg>`,
          "{enter}": "Enter",
        }}
        theme={"hg-theme-default wordleTheme"}
        buttonTheme={getButtonTheme(isDailyMode ? solution : randomWord)}
        disableButtonHold
        mergeDisplay
        onKeyReleased={onKeyReleased}
        physicalKeyboardHighlight
        physicalKeyboardHighlightPress
        useButtonTag
        physicalKeyboardHighlightBgColor={"#9ca3af"}
      />
    </div>
    // <Board input={input} ref={keyboard} onKeyReleased={onKeyReleased}/>
  );
}
