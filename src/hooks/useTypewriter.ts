"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypewriter(text: string, speed = 60, startDelay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  const reset = useCallback(() => {
    setDisplayed("");
    setDone(false);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const delayTimer = setTimeout(() => {
      setDisplayed("");
      setDone(false);
      let i = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done, reset };
}
