"use client";

import { carretBackspace } from "@/components/utils/carretHandler";
import carretNextLine from "@/components/utils/carretNextLine";
import carretPreviousLine from "@/components/utils/carretPreviousLine";
import getCarretLeft from "@/components/utils/getCarretLeft";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Editor() {
  const sentence = `def
if
print
do
`;

  const ref = useRef();
  const lastLine = useRef();
  const carret = useRef();
  const current = useRef(0);
  const [typed, setTypes] = useState([]);

  useEffect(() => {
    ref.current.focus();
    lastLine.current = []

    document.addEventListener("click", () => {
      ref.current.focus();
    });
  }, []);

  const wordSpanRefs = useMemo(
    () =>
      Array(sentence.length)
        .fill(0)
        .map((i) => React.createRef()),
    [sentence]
  );

  const handleKeyDown = (e) => {
    const { key, keyCode } = e;
    const currentIndex = current.current;

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
        carretBackspace(carret.current, current.current, wordSpanRefs, lastLine.current)
        setTypes((prev) => prev.slice(0, -1));
        current.current -= 1;
        wordSpanRefs[current.current].current.classList.remove("correct", "wrong");
      }else{
        carret.current.style.left = "0px"
        carret.current.style.top = "0px"
      }


    } else {
      const isEnter = keyCode === 13 && sentence[currentIndex] === "\n";
      carret.current.style.left = getCarretLeft(carret, wordSpanRefs[current.current]);

      if (sentence[currentIndex] === key || isEnter) {
        wordSpanRefs[current.current].current.classList.add("correct");
      } else {
        wordSpanRefs[current.current].current.classList.add("wrong");
      }

      if (isEnter) {
        // Storing End Position
        lastLine.current.push(carret.current.style.left);
        carret.current.style.top = carretNextLine(carret, wordSpanRefs[current.current], lastLine);
        carret.current.style.left = "0px";

      }

      setTypes((prev) => [...prev, key]);
      current.current += 1;
    }
  };

  let charCounter = 0;

  return (
    <div className="text-center text-white h-screen grid place-items-center">
      <div className="text-3xl leading-8 text-[#797979] text-left relative">
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
        ref={ref}
        rows="5"
        cols="50"
        id="multiLineInput"
        onKeyDown={handleKeyDown}
        className="bg-[#111111] text-white"
      ></textarea>
    </div>
  );
}
