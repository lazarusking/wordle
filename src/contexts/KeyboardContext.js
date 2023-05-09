import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { wordChecker } from "../util/gameFunctions";
import { isWordInWordList } from "../util/words";
import { useAlertContext } from "./AlertContext";

const initialState = { input: "", element: Element, parentElement: null };
const KeyboardContext = createContext({
  input: "",
  element: null,
  parentElement: null,
  alert: { message: "", alertState: false },
});
const KeyboardDispatchContext = createContext({keyDispatch:()=>null});

function keyboardReducer(state, action) {
  switch (action.type) {
    case "SET_PROPS":
      return { ...state, ...action.props };
    case "{backspace}": {
      const props = { ...state };

      const hasPrevSibling =
        props.element.previousElementSibling || props.element;
      if (hasPrevSibling) {
        // setElement(hasPrevSibling);
        const curElement = hasPrevSibling;
        const curInput = props.input.slice(0, -1);
        hasPrevSibling.value = "";
        console.log(hasPrevSibling, "previous");
        // element.value = "";
        // setInput((prev) => prev.slice(0, -1));
        hasPrevSibling.dataset.animate = "";

        return { ...state, element: curElement, input: curInput };
      }
      break;
    }
    // break;
    case "{enter}": {
      const props = {
        ...state,
        size: action.size,
      };
      if (props.input.length < props.size) {
        console.log("not enough", action, props);
        action.displayNotification("Not enough letters");
        // props.setGameData({...props.gamedata,settings:"097"});

        return {
          ...state,
          element: props.element,
          class: props.element.className,
        };
      }
      if (props.element.nodeName === "BUTTON") {
        console.info(props.element);
        // gamedata = getLocalStorage();

        if (isWordInWordList(props.input)) {
          //   return setGameData(wordChecker(parentElement, gamedata, props.size));
          wordChecker(props.parentElement, props.gamedata, props.size);
          return { ...props };
        } else {
          props.displayNotification("Word not found");
          action.displayNotification("Word not found");
        }
        // setCurrentElement();
      }
      break;
    }
    case "SHOW_NOTIFICATION":
      return { ...state, alert: { alertState: true, message: action.payload } };
    // break;
    case "HIDE_NOTIFICATION":
      return { ...state, alert: {} };
    case "SHOW_NOTIFI":
      state.displayNotification(action.message);
      break;
    default: {
      const props = { ...state };
      //
      let curElement=state.element;
      let curInput=state.input;
      console.log(state);
      //   keyboard.current.setOptions({
      //     inputName: `.${element.className}`,
      //   });
      //   element.value = "";
      const val = action.type.replace(/[^a-zA-Z]/g, "")[0];
      console.log(action,val);
      curElement.value = val;
      console.log(curElement.value);
      // console.debug(keyboard.current.getAllInputs(), val);
      //   keyboard.current.setInput(val, `.${element.className}`);
      const hasValue = state.element.value != "";
      console.log(hasValue);
      const hasSibling = state.element.nextElementSibling;
      state.element.dataset.animate = "pop";
      if (hasValue && hasSibling) {
        curInput = state.input + val;
        curElement = hasSibling;
        console.log(state.element.value,curElement.value);

        // setElement(hasSibling);
        // keyboard.current.setOptions({
        //   inputName: `.${hasSibling.className}`,
        // });
      }
      return { ...state, element: curElement, input: curInput };
      // return state;
    }
    //   break;
  }
}

export function KeyboardProvider({ rows, children, el, parent, setEl }) {
  const [element, setElement] = useState(el);
  const initial = {
    input: "",
    element: el,
    parentElement: parent,
    alert: { message: "", alertState: false },
  };
  function init(initialState) {
    return initialState;
  }
  useEffect(() => {
    setElement(el);
    return () => {};
  }, [el]);

  // const { displayNotification } = useAlertContext();
  // console.log(el);
  const [state, keyDispatch] = useReducer(keyboardReducer, {
    input: "",
    element: element,
    parentElement: parent,
    alert: { message: "", alertState: false },
  });
  // const newState = { ...state,displayNotification, parentElement: parent, element: el };
  // keyDispatch({type:"SET_PROPS",props:{initial}})
  //   useEffect(() => {
  //     // console.log(isWordInWordList("abate"));
  //     // console.log(props.rows.current);
  //     // setParentElement(props.rows.current);
  //     // console.log(parentElement);
  //     console.log("props changing");
  //     // const parent = setCurrentElement(props, gamedata);
  //     setElement(el);
  //     // console.log(element, rows);
  //     // const gamedata = getLocalStorage();
  //   }, [el]);
  const showNotification = (message) => {
    return keyDispatch({ type: "SHOW_NOTIFICATION", payload: message });
  };
  const hideNotification = () => {
    return keyDispatch({ type: "HIDE_NOTIFICATION" });
  };
  const displayNotification = (message) => {
    showNotification(message);
    function e() {
      hideNotification();
    }
    setTimeout(e, 2000);
    clearTimeout(e);
  };
  const typeDispatch = (key) => {
    return keyDispatch({ type: key });
  };
  const enterDispatch = (size, displayNotification) => {
    return keyDispatch({
      type: "{enter}",
      size: size,
      displayNotification: displayNotification,
    });
  };
  return (
    <KeyboardContext.Provider
      value={{
        state,
        rows,
      }}
    >
      <KeyboardDispatchContext.Provider
        value={{
          keyDispatch,
          displayNotification,
          enterDispatch,
          typeDispatch,
        }}
      >
        {children}
      </KeyboardDispatchContext.Provider>
    </KeyboardContext.Provider>
  );
}
export function useKeyboardContext() {
  return useContext(KeyboardContext);
}
export function useKeyboardDispatchContext() {
  return useContext(KeyboardDispatchContext);
}
    // keyDispatch({ type: button, size: props.size,displayNotification:displayNotification });
    // switch (button) {
    //   case "{backspace}":
    //     // keyDispatch({ type: button });
    //     break;
    //   case "{enter}":
    //     // keyDispatch({ type: button , size: props.size });
    //     enterDispatch(props.size,displayNotification)
    //     break;

    //   default:
    //     // keyDispatch({ type: button, size: props.size });
    //     typeDispatch(button)

    //     break;
    // }