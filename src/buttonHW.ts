import { state } from './steven/state'
import { create } from 'domain';

// Create four buttons: 'up', 'right', 'down', 'left'
// Create a div that is 1000 pixels by 1000 pixels, with a blue background
// Inside the div, create a child div that is 10 pixels by 10 pixels, has an orange background, and has an id of 'you'
// Create an object called state that looks like { x: 0, y: 0 }
// Add functionality so that when a user
// clicks 'up' the value of state.location.y increases by 1
// clicks 'right' the value of state.location.x increases by 1
// clicks 'down' the value of state.location.y decreases by 1
// clicks 'left' the value of state.location.x decreases by 1
// clicks any button, 'you''s position inside of its parent div is adjusted to reflect the values of state.location.
// clicks, 'you' never leaves the bounds of the parent div.

const config = {
    boardHeight: 300,
    boardWidth: 300,
    boardColor: 'blue',
    userColor: 'orange',
    tailColor: 'red',
    moveDistance: 10,
    userWidth: 10,
    userHeight: 10,
    goodieColor: 'purple',
    resetButtonColor: 'red'
}
// Does tailDivMachine need an argument?
const tailDivMachine = () => {

    const tailSegment = document.createElement('div');
    tailSegment.style.width = config.userWidth + 'px';
    tailSegment.style.height = config.userHeight + 'px';
    tailSegment.style.background = config.tailColor;
    tailSegment.style.position = 'absolute';
    tailSegment.style.left = state.location.x + 'px';
    tailSegment.style.top = state.location.y + 'px';
    tailSegment.id = 'tail';
    board.appendChild(tailSegment)
    return tailSegment
}

const updateState = (payload) => {
    if (payload === 'up' && state.location.y > 0) {
        state.location.y = state.location.y - config.moveDistance

    } else if (payload === 'down' && state.location.y < config.boardHeight - config.userHeight) {
        state.location.y = state.location.y + config.moveDistance
    } else if (payload === 'left' && state.location.x > 0) {
        state.location.x = state.location.x - config.moveDistance
    } else if (payload === 'right' && state.location.x < config.boardWidth - config.userWidth) {
        state.location.x = state.location.x + config.moveDistance
    } else if (payload === 'reset') {
        state.score = 0
        state.moving = true

        state.goodies.forEach(goodie => {
            goodie.remove()
        })
        state.goodies = []

        state.goodies.push(createGoodie())
        state.goodies.push(createGoodie())
        state.goodies.push(createGoodie())

        state.location.x = 0
        state.location.y = 0
        state.segments.forEach(segment => {
            segment.remove()
        })
        state.segments = []

    }

    console.log(state)
    gamePiece.style.left = state.location.x + 'px'
    gamePiece.style.top = state.location.y + 'px'



    let lastX = state.location.x + 'px'
    let lastY = state.location.y + 'px'
    state.segments.forEach(segment => {
        // captures segment start location
        const xCache = segment.style.left
        const yCache = segment.style.top
        // updates segment position to that of its last tail pieces position
        segment.style.left = lastX
        segment.style.top = lastY
        // stores this tail pieces initial position so the next tail piece can inherit that
        lastX = xCache
        lastY = yCache

    })

    state.goodies = state.goodies.reduce((acc, goodie) => {
        if (goodie.x === state.location.x && goodie.y === state.location.y) {

            // alert('YAY')
            state.score = state.score + goodie.points
            updateScore(state.score)
            // add goodie size/original gamepiece size to gamepiece when goodie is hit - DONE
            // make additional length a different color - DONE
            // make additional length follow behind gamepiece
            // create a "div" factory that fires whenever a goodie is hit? - DONE
            // new divs location is based on updateStates direction?


            board.removeChild(goodie.elem)


            const segment = tailDivMachine()
            state.segments.push(segment)


            // this creates a new goodie on the board that a) doesnt give points and b) doesnt get eaten...
            const newGoodie = createGoodie()
            // state.goodies.push(newGoodie)
            acc.push(newGoodie)


        } else {
            acc.push(goodie)
        }
        return acc
    }, []);

}

let interval: any
const move = (direction) => {
    if (!state.moving) {
        state.moving = true
        interval = setInterval(() => {
            updateState(direction)
        }, 100)

    } else {
        clearInterval(interval)
        state.moving = false
    }
}
const buttonFactory = (direction) => {
    const element = document.createElement('button')
    document.body.appendChild(element)
    element.innerText = direction
    element.addEventListener('click', () => {
        move(direction)
    })

}
document.body.addEventListener('keydown', (event) => {
    // Was the key an arrow key?
    // if yes: which arrow key?
    if (event.keyCode === 38) {
        move('up')
    } else if (event.keyCode === 40) {
        move('down')
    } else if (event.keyCode === 37) {
        move('left')
    } else if (event.keyCode === 39) {
        move('right')
    }
}
)


buttonFactory('up')
buttonFactory('down')
buttonFactory('left')
buttonFactory('right')

const scoreDiv = document.createElement('div')
const updateScore = (newScore) => {
    scoreDiv.innerText = 'Score: ' + newScore.toString()
}
document.body.appendChild(scoreDiv)

updateScore(state.score)


const board = document.createElement('div');
board.style.width = config.boardWidth + 'px';
board.style.height = config.boardHeight + 'px';
board.style.background = config.boardColor;
board.style.position = 'relative';
document.body.appendChild(board)

//creates the game piece
const gamePiece = document.createElement('div');
gamePiece.style.width = config.userWidth + 'px';
gamePiece.style.height = config.userHeight + 'px';
gamePiece.style.background = config.userColor;
gamePiece.style.position = 'absolute';
gamePiece.style.left = '0px';
gamePiece.style.top = '0px';
gamePiece.id = 'you';
board.appendChild(gamePiece)

function getRandomInt(min, max) {
    const num = Math.random() * (max - min + 1) + min // 44.123
    const rounded = Math.floor(num); //44
    const toTheTens = Math.floor(rounded / 10) * 10
    return toTheTens

}

const fruits = {
    apple: 'https://stickershop.line-scdn.net/stickershop/v1/product/1745817/LINEStorePC/main.png;compress=true',
    lychee: 'https://www.teisseire.com/media/1740/litchipng.png',
    kiwi: 'https://mightieskiwi.com/content/themes/baileylauerman/assets/media/images/mighties/lg-kiwi-man-spoon.png'
}

const makeGoodieDiv = (x, y) => {
    const goodieElem = document.createElement('div')
    board.appendChild(goodieElem)
    goodieElem.style.width = config.userWidth + 'px';
    goodieElem.style.height = config.userHeight + 'px';
    goodieElem.style.background = config.goodieColor;
    goodieElem.style.position = 'absolute';
    goodieElem.style.left = x + 'px';
    goodieElem.style.top = y + 'px';
    if (config.userWidth + x > config.boardWidth) {
        throw new Error('Goodie will appear off the board')
    }
    return goodieElem
}
const createGoodie = () => {
    const points = getRandomInt(1, 100)
    let image
    if (points < 33) {
        image = fruits.apple
    } else if (points < 66) {
        image = fruits.lychee

    } else {
        image = fruits.kiwi

    }
    const x = getRandomInt(0, config.boardWidth - config.userWidth)
    const y = getRandomInt(0, config.boardHeight - config.userHeight)
    const singleGoodie = {
        x,
        y,
        points,
        image,
        elem: makeGoodieDiv(x, y)
    }

    return singleGoodie
}

state.goodies.push(createGoodie())
state.goodies.push(createGoodie())
state.goodies.push(createGoodie())

// new goodie gets created whenever old goodie gets 'eaten'





const reset = document.createElement('button')
document.body.appendChild(reset)
reset.innerText = 'Reset!'
reset.style.backgroundColor = config.resetButtonColor
reset.addEventListener('click', () => {
    updateState('reset')
    updateScore(state.score)

    move('reset')
    gamePiece.style.width = config.userWidth + 'px';
    gamePiece.style.height = config.userHeight + 'px';
})


