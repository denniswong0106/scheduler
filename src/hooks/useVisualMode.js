import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newHistory, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        const newArr = prev.slice(0, -1);
        return [...newArr, newHistory];
      });
    } else {
      setHistory((prev) => {
        return [...prev, newHistory];
      });
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        const newArr = prev.slice(0, -1);
        return newArr;
      });
    }
  };

  // As mode is always the last item in history array
  // use .slice to create a copy of history
  // set mode as last item in history
  let mode = history.slice(-1)[0];

  return { mode, transition, back };
}
