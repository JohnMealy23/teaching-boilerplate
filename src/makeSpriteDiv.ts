export const makeSpriteDiv = (x, y, image, config, board) => {
    const goodieElem = document.createElement('img')
    board.appendChild(goodieElem)
    goodieElem.style.width = config.userWidth + 'px';
    goodieElem.style.height = config.userHeight + 'px';
    // goodieElem.style.background = config.goodieColor;
    goodieElem.src = image
    goodieElem.style.position = 'absolute';
    goodieElem.style.left = x + 'px';
    goodieElem.style.top = y + 'px';
    if (config.userWidth + x > config.boardWidth) {
        throw new Error('Goodie will appear off the board')
    }
    return goodieElem
}