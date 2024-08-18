function getCarretLeft(caret, element, operator = true) {
  const currentCarretPosition = caret.current?.style?.left || 0;
  const letterWidth = element?.current?.getClientRects()[0]?.width || 5;

  // Convert into Float Number
  const currentLeft = parseFloat(currentCarretPosition.match(/-?\d+(\.\d+)?/)[0]);

  let diff = currentLeft - letterWidth;

  return operator ? `${letterWidth + currentLeft}px` : `${diff < 0 ? 0 : diff}px`;
}

export default getCarretLeft;
