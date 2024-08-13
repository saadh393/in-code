"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Editor() {
  const sentence = `def inOrderPrint(node):
    if node.left is not None:
        inOrderPrint(node.left)

    print(node.data)

    if node.right is not None:
        inOrderPrint(node.right)
`

  const ref= useRef();
  const current = useRef(0)
  const [typed, setTypes] = useState([])

  useEffect(()=> {
    ref.current.focus()

    document.addEventListener("click", () => {
      ref.current.focus()
    })
  }, [])

  const wordSpanRefs = useMemo(
    () =>
      Array(sentence.length)
        .fill(0)
        .map((i) => React.createRef()),
    [sentence]
  );

  const handleKeyDown = (e)=>{
    const { key, keyCode } = e
    const currentIndex = current.current
    
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

    if(key == "Backspace"){
      if(currentIndex >= 0){
        setTypes((prev) => prev.slice(0, -1))
        current.current -= 1
        wordSpanRefs[current.current].current.classList.remove("correct", "wrong")
      }
    }else{
      const isEnter = keyCode === 13 && sentence[currentIndex] === "\n"
      if (sentence[currentIndex] === key || isEnter) {
        wordSpanRefs[current.current].current.classList.add("correct");
      } else {
        wordSpanRefs[current.current].current.classList.add("wrong");
      }

      setTypes((prev) => [...prev, key])

      current.current += 1
    }

    

  }
  
  let charCounter = 0

  return (
    <div className="text-center text-white h-screen grid place-items-center">
      <div className="text-3xl leading-8 text-[#797979] text-left">
        {sentence.split("\n").map((line, lineIndex) => {
          const isLastLine = lineIndex === sentence.split("\n").length - 1;

          return (
            <div key={`line-${lineIndex}`}>
              {line.split("").map((char, charIndex) => {
                const key = `char-${charCounter}`
                const charRef = wordSpanRefs[charCounter]
                charCounter++
                if (char === " ") {
                  return <span key={key} ref={charRef}>&nbsp;</span>
                }
                return <span key={key} ref={charRef}>{char}</span>
              })}
              {!isLastLine && (
                <span
                  key={`char-${charCounter}`}
                  ref={wordSpanRefs[charCounter]}
                  className="newline"
                >
                  ↵
                </span>
              )}
              {!isLastLine && charCounter++}
            </div>
          )
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
  )
}
