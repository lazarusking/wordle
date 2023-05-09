import { forwardRef } from "react";
import KeyboardComponent from "./Keyboard";
import WordleCells from "./WordleCells";

export default forwardRef(function Wrapper({ ...props }, ref) {
  return (
    <>
      <WordleCells ref={ref} {...props} />
      <KeyboardComponent key={props.isDailyMode} {...props} />
    </>
  );
});
