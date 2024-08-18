function carretNextLine(caret, element, ) {
  const currentCarretPosition = caret.current?.style?.top || "0px";
  const letterHeight = element?.current?.getClientRects()[0]?.height || 5
  
  // Convert into Float Number
  const currentHeight = parseFloat(currentCarretPosition.match(/-?\d+(\.\d+)?/)[0])

  return `${letterHeight + currentHeight}px`
}

export default carretNextLine;