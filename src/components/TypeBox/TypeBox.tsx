"use client";

import { carretHandler } from "@/components/utils/carretHandler";

import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { TypeBoxDefaultValue, TypeBoxTypes } from "./TypeBox.types";

export default function TypeBox(props: TypeBoxTypes) {
  const { sentence, debug } = props;
  if (!sentence) {
    return <p>Something Went Wrong</p>;
  }

  const inputAreaRef: RefObject<HTMLTextAreaElement> = useRef();
  const lastLine: RefObject<HTMLSpanElement> = useRef();
  const carret: RefObject<HTMLDivElement> = useRef();
  const container = useRef();
  const current = useRef(0);
  const [typed, setTypes] = useState([]);

  useEffect(() => {
    inputAreaRef.current.focus();
    // lastLine.current = [];

    document.addEventListener("click", () => {
      inputAreaRef.current.focus();
    });
  }, []);

  const wordSpanRefs = useMemo<React.RefObject<HTMLSpanElement>[]>(
    () =>
      Array(sentence.length)
        .fill(0)
        .map((i) => React.createRef()),
    [sentence]
  );

  const handleKeyDown = (e) => {
    const { key, keyCode } = e;
    const currentIndex = current.current;
    const disableKeyCode = [9, 17, 18, 27, 37, 38, 39, 40];

    if (currentIndex > sentence.length) {
      e.preventDefault();
      return;
    }

    if (disableKeyCode.includes(keyCode)) {
      e.preventDefault();
      return;
    }

    // disable Caps Lock key
    if (keyCode === 20) {
      e.preventDefault();
      return;
    }

    // disable shift alt ctrl
    if (keyCode >= 16 && keyCode <= 18) {
      e.preventDefault();
      return;
    }

    if (key == "Backspace") {
      if (currentIndex > 0) {
        carretHandler(container, wordSpanRefs, current, carret, true);
        current.current -= 1;
        wordSpanRefs[current.current].current.classList.remove("correct", "wrong");
      } else {
        carret.current.style.left = "0px";
        carret.current.style.top = "0px";
      }

      // Updating Typed Text
      setTypes((prev) => prev.slice(0, -1));
    } else {
      if (current.current >= wordSpanRefs.length) return;
      const isEnter = keyCode === 13 && sentence[currentIndex] === "\n";

      // Will convert into a function
      carretHandler(container, wordSpanRefs, current, carret);

      if (sentence[currentIndex] === key || isEnter) {
        wordSpanRefs[current.current].current.classList.add("correct");
      } else {
        wordSpanRefs[current.current].current.classList.add("wrong");
      }

      setTypes((prev) => [...prev, key]);
      current.current += 1;
    }
  };

  let charCounter = 0;

  return (
    <div className="text-center text-white h-screen grid place-items-center">
      <div className="text-3xl leading-8 text-[#797979] text-left relative" ref={container}>
        <div className="caret" style={{ left: 0, top: 0 }} ref={carret}></div>
        {sentence.split("\n").map((line, lineIndex) => {
          const isLastLine = lineIndex === sentence.split("\n").length - 1;

          return (
            <div key={`line-${lineIndex}`}>
              {line.split("").map((char, charIndex) => {
                const key = `char-${charCounter}`;
                const charRef = wordSpanRefs[charCounter];
                charCounter++;
                if (char === " ") {
                  return (
                    <span key={key} ref={charRef}>
                      _
                    </span>
                  );
                }

                return (
                  <span key={key} ref={charRef}>
                    {char}
                  </span>
                );
              })}
              {!isLastLine && (
                <span key={`char-${charCounter}`} ref={wordSpanRefs[charCounter]} className="newline">
                  ↵
                </span>
              )}
              {!isLastLine && charCounter++}
            </div>
          );
        })}
      </div>
      <textarea
        ref={inputAreaRef}
        id="multiLineInput"
        onKeyDown={handleKeyDown}
        className="bg-[#111111] text-white"
      ></textarea>
    </div>
  );
}

TypeBox.defaultProps = TypeBoxDefaultValue;
