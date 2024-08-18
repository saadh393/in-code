
function carretBackspace(carretDom, position, wordsList, lastLine) {
    const _REGEX_DIGIT_ = /-?\d+(\.\d+)?/

    const currentWord = wordsList[position - 1].current

    // Calculating Carret Current Positions
    const x = carretDom?.style?.left || "0px"
    const left = parseFloat(x.match(_REGEX_DIGIT_)[0])

    const y = carretDom?.style?.top || "0px"
    const top = parseFloat(y.match(_REGEX_DIGIT_)[0])

    // Extracting Current Word Position
    const { width, height } = currentWord.getClientRects()[0]

    // Setting Positions on Backspace
    if ((left - width) < 0) {
        if (lastLine.length > 0) {
            const lastLeftDigt = lastLine?.pop().match(_REGEX_DIGIT_)[0]
            carretDom.style.left = `${lastLeftDigt - width}px`
        } else {
            carretDom.style.left = "0px"
        }
    } else {
        console.log(left, width)
        carretDom.style.left = `${(left - width)}px`
    }


    // Carret Dom Top Position
    if ((left - width) < 0 && top != 0) {
        carretDom.style.top = `${top - height}px`
    } else {
        carretDom.style.top = `${top}px`
    }
}

module.exports = { carretBackspace }