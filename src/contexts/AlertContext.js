import { createContext, useCallback, useContext, useReducer } from "react";

const AlertContext = createContext({
  state: { alert: false, newAlert: [] },
  message: null,
  displayNotification: () => null,
});

export function useAlertContext() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [state, dispatch] = useReducer(alertReducer, {
    alert: false,
    newAlert: [],
  });

  const showNotification = useCallback((message, status = "error") => {
    return dispatch({
      type: "SHOW_NOTIFICATIONS",
      message: message,
      status: status,
    });
  }, []);
  const clearNotification = useCallback(() => {
    return dispatch({
      type: "CLEAR_NOTIFICATIONS",
    });
  }, []);
  // const hideNotification = () => {
  //   return dispatch({ type: "HIDE_NOTIFICATIONS" });
  // };
  const displayNotification = useCallback(
    (message, status = "error", options) => {
      const { persist, onFinish } = options || {};
      showNotification(message, status);
      function e() {
        clearNotification();
      }
      if (!persist) {
        clearTimeout(e);
        setTimeout(e, 2000);
        if (onFinish) {
          onFinish();
        }
        // clearTimeout(e);
      }
    },
    [clearNotification, showNotification]
  );

  const value = { state, dispatch, displayNotification, clearNotification };
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

function alertReducer(state, action) {
  switch (action.type) {
    case "SHOW_NOTIFICATIONS": {
      const newAlert = { message: action.message, status: action.status };
      console.debug(newAlert);
      return {
        alert: true,
        newAlert: [...state.newAlert, newAlert],
      };
    }
    // break;
    case "HIDE_NOTIFICATIONS":
      return { alert: false, newAlert: [...state.newAlert.slice(0, -1)] };
    case "CLEAR_NOTIFICATIONS":
      return { alert: false, newAlert: [] };
    default:
      break;
  }
}
