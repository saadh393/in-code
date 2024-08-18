function carretPreviousLine(caret, element) {
    const currentCarretPosition = caret.current?.style?.top || "0px";
    const top = parseFloat(currentCarretPosition.match(/-?\d+(\.\d+)?/)[0])

    const currentLeftPosition = caret.current.style.left || "0px"
    const left = parseFloat(currentLeftPosition.match(/-?\d+(\.\d+)?/)[0])
    
    const letterHeight = element?.current?.getClientRects()[0]?.height || 5
    console.log(left, top, letterHeight, left == 0, top != 0)
    if(left == 0 && top != 0){
        return `${top - letterHeight}px`;
    }else{
        return currentCarretPosition
    }  
  }


  
  export default carretPreviousLine;