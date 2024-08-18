function carretNextLine(caret, element,lastLine ) {
  const currentCarretPosition = caret.current?.style?.top || "0px";
  const letterHeight = element?.current?.getClientRects()[0]?.height || 5

  const width = element?.current?.getClientRects()[0].width
  const left = caret.current?.style?.left
  const x = left.match(/-?\d+(\.\d+)?/)[0]
  lastLine.current.push(caret.current?.style?.left);
  console.log(element?.current)
  
  // Convert into Float Number
  const currentHeight = parseFloat(currentCarretPosition.match(/-?\d+(\.\d+)?/)[0])

  return `${letterHeight + currentHeight}px`
}

export default carretNextLine;