import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newHistory, replace = false) => {
    // The second argument, if true, allows transition to replace
    // the last history item with the new history item, as opposed
    // to adding the new item to the existing history array
    if (replace) {
      setHistory((prev) => {
        // slice creates a copy of the history array with last item removed
        const newArr = prev.slice(0, -1);
        return [...newArr, newHistory];
      });
    } else {
      setHistory((prev) => {
        return [...prev, newHistory];
      });
    }
  };

  // Function that sets the history state to go back
  // to the last history (ie. remove the last added item in array)
  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        const newArr = prev.slice(0, -1);
        return newArr;
      });
    }
  };

  // As mode is always the last item in history array
  // set mode as last item in history
  const mode = history[history.length - 1];

  return { mode, transition, back };
}
