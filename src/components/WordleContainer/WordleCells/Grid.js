import { forwardRef, useRef } from "react";
import { buildColorString, decodeToString } from "../../../utils/gameFunctions";
import Row from "./Row";

export default forwardRef(function Grid(
  { size, wordGuessCount, gamedata, randomWord, isDailyMode, ...props },
  ref
) {
  const fallbackRef = useRef(null);

  const rows = [];
  const [text] = props.text;

  const keyRef = useRef("");
  // console.log(gamedata);
  let wordList, enc;
  if (isDailyMode) {
    // ({ wordList, enc } = {wordList:['BLAST'],enc:['72']});
    ({ wordList, enc } = gamedata.game);
    keyRef.current = "";
  } else {
    wordList = gamedata;

    keyRef.current = "random-";
  }

  // console.log(wordList);

  const otherRows =
    wordList.length < wordGuessCount ? wordGuessCount - wordList.length : [];
  // console.log(otherRows, wordList);
  for (let index = 0; index < wordList.length; index++) {
    const curWord = wordList[index];
    const baseDecode = enc ? enc[index] : null;
    const wc = buildColorString(curWord, !isDailyMode && randomWord);
    const decodedString = decodeToString(baseDecode, size) || wc;
    rows.push(
      <Row
        key={`${keyRef.current}${index + 1}`}
        size={size}
        id={index + 1}
        word={curWord}
        colorString={decodedString}
        className="row-letters"
      />
    );
  }
  if (wordList.length < wordGuessCount) {
    rows.push(
      <Row
        key={`${keyRef.current}${wordList.length + 1}`}
        size={size}
        id={wordList.length + 1}
        word={text}
        // colorString={decodedString}
        className="row-letters"
      />
    );
  }
  for (let index = 1; index < otherRows; index++) {
    rows.push(
      <Row
        key={`${keyRef.current}${wordList.length + index + 1}`}
        size={size}
        id={wordList.length + index + 1}
        className="row-letters"
      />
    );
  }

  return (
    <>
      <div ref={ref || fallbackRef} className="game-rows">
        {rows}
      </div>
    </>
  );
});
