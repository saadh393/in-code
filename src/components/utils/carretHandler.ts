function carretBackspace(carretDom, position, wordsList, lastLine) {
  const _REGEX_DIGIT_ = /-?\d+(\.\d+)?/;

  const currentWord = wordsList[position - 1].current;

  // Calculating Carret Current Positions
  const x = carretDom?.style?.left || "0px";
  const left = parseFloat(x.match(_REGEX_DIGIT_)[0]);

  const y = carretDom?.style?.top || "0px";
  const top = parseFloat(y.match(_REGEX_DIGIT_)[0]);

  // Extracting Current Word Position
  const { width, height } = currentWord.getClientRects()[0];

  // Setting Positions on Backspace
  if (left - width < 0) {
    if (lastLine.length > 0) {
      const lastLeftDigt = lastLine?.pop().match(_REGEX_DIGIT_)[0];
      carretDom.style.left = `${lastLeftDigt - width}px`;
    } else {
      carretDom.style.left = "0px";
    }
  } else {
    console.log(left, width);
    carretDom.style.left = `${left - width}px`;
  }

  // Carret Dom Top Position
  if (left - width < 0 && top != 0) {
    carretDom.style.top = `${top - height}px`;
  } else {
    carretDom.style.top = `${top}px`;
  }
}

function carretHandler(container, wordSpanRefs, current, carret, backspace = false) {
  // @todo: Write Down Comment Why this logic is Written
  if (current.current >= wordSpanRefs.length) return;

  const isEnterPressed = wordSpanRefs[current?.current].current.innerText == "↵";
  let pos;
  if (backspace) {
    pos = current?.current - 2;
  } else if (isEnterPressed) {
    pos = current?.current + 1;
  } else {
    pos = current?.current;
  }

  // Cursor Boundary is the Boundary of the Container
  const { left: leftBound, top: topBound } = container.current.getClientRects()[0];

  const {
    right: rightPos,
    top: topPos,
    width: alphSize,
  } = wordSpanRefs[pos]?.current?.getClientRects()[0] || { right: leftBound, top: topBound };

  console.log("text", wordSpanRefs[pos]?.current?.innerText);
  console.log("current", wordSpanRefs[current?.current]?.current?.innerText);

  console.log("Prev Cursor Pos ", carret.current.style.left);

  carret.current.style.left = isEnterPressed ? `${rightPos - leftBound - alphSize}px` : `${rightPos - leftBound}px`;
  carret.current.style.top = `${topPos - topBound}px`;
}

module.exports = { carretBackspace, carretHandler };

// carretHandler(container, wordSpanRefs, current, carret)

// carretHandler(container, wordSpanRefs, current, carret, true)
