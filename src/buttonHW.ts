import { getState, config, Goodie } from './steven/state'
import { getRandomInt } from './getRandomInt';
import { makeSpriteDiv } from './makeSpriteDiv';
import { createWormHole, Wormhole } from './createWormHole';
import { checkIntersect } from './checkIntersect';


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




const board = document.createElement('div');
board.style.width = config.boardWidth + 'px';
board.style.height = config.boardHeight + 'px';
board.style.background = config.boardColor;
board.style.position = 'relative';
document.body.appendChild(board)

const state = getState(config, board)

const segmentFactory = () => {
    const tailSegment = document.createElement('div');
    tailSegment.style.width = config.userWidth + 'px';
    tailSegment.style.height = config.userHeight + 'px';
    tailSegment.style.background = config.tailColor;
    tailSegment.style.position = 'absolute';
    tailSegment.style.left = state.location.x + 'px';
    tailSegment.style.top = state.location.y + 'px';
    tailSegment.id = 'tail';
    tailSegment.style.borderRadius = 50 + 'px'
    board.appendChild(tailSegment)
    return tailSegment
}
type UpdateStateType = 'move' | 'reset' | 'youDied'
type Direction = 'up' | 'down' | 'left' | 'right'
const updateState = (type: UpdateStateType, payload?: Direction) => {
    if (type === 'move') {
        movePiece(payload)

    } else if (type === 'youDied') {
        state.moving = false
        gamePiece.style.left = 0 + 'px';
        gamePiece.style.top = 0 + 'px'

        state.location.x = 0
        state.location.y = 0



    } else if (type === 'reset') {
        state.lives = config.defaultLives
        state.score = 0

        state.goodies.forEach(goodie => {
            goodie.elem.remove()
        })
        state.goodies = []
        state.moving = false
        gamePiece.style.left = 0 + 'px';
        gamePiece.style.top = 0 + 'px'

        state.location.x = 0
        state.location.y = 0

        state.goodies.push(createGoodie())
        state.goodies.push(createGoodie())
        state.goodies.push(createGoodie())
        state.segments.forEach(segment => {
            segment.remove()
        })
        state.segments = []
    }





    let goodieWasHit = false
    const increaseLife = (checkCache) => {
        if (checkCache >= state.pointPlus) {
            state.lives = state.lives + 1
            updateLives(state.lives)
            state.pointCache = 0
        }
    }


    if (checkIntersect(state.location, state.wormHoles.one)) {
        // we know wormHoleOne has been hit
        state.location.x = state.wormHoles.two.x
        state.location.y = state.wormHoles.two.y
    } else if (checkIntersect(state.location, state.wormHoles.two)) {
        // we know wormHoleTwo has been hit

        state.location.x = state.wormHoles.one.x
        state.location.y = state.wormHoles.one.y
    }

    state.goodies = state.goodies.reduce((acc, goodie) => {//goodieHitFun()
        //const goodieHitFun = () => {}
        if (checkIntersect(goodie, state.location)) {
            goodieWasHit = true
            // alert('YAY')
            state.score = state.score + goodie.points
            updateScore(state.score)
            state.pointCache = state.pointCache + goodie.points
            increaseLife(state.pointCache)

            board.removeChild(goodie.elem)

            const segment = segmentFactory()
            state.segments.push(segment)

            const newGoodie = createGoodie()
            // state.goodies.push(newGoodie)
            acc.push(newGoodie)


        } else {
            acc.push(goodie)
        }
        return acc
    }, [] as Goodie[]);
    if (goodieWasHit === false) {
        tailHitCheck()
    }


}
const movePiece = (direction) => {
    let lastX = gamePiece.style.left
    let lastY = gamePiece.style.top
    let shouldMoveSegments = true
    if (direction === 'up') {
        state.location.y = state.location.y - config.moveDistance
    } else if (direction === 'down') {
        state.location.y = state.location.y + config.moveDistance
    } else if (direction === 'left') {
        state.location.x = state.location.x - config.moveDistance
    } else if (direction === 'right') {
        state.location.x = state.location.x + config.moveDistance
    } else {
        shouldMoveSegments = false
    }

    if (shouldMoveSegments) {
        updateSegments(lastX, lastY)
    }
    gamePiece.style.left = state.location.x + 'px'
    gamePiece.style.top = state.location.y + 'px'


}

const updateSegments = (lastX, lastY) => {
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
}
let interval: any
const moveStart = (direction) => {
    state.moving = true
    clearInterval(interval)
    interval = setInterval(() => {
        updateState('move', direction)
        boarderCheck()

    }, 100)

}


const buttonFactory = (direction) => {
    const element = document.createElement('button')
    document.body.appendChild(element)
    element.innerText = direction
    element.addEventListener('click', () => {
        moveStart(direction)
    })

}
document.body.addEventListener('keydown', (event) => {
    // Was the key an arrow key?
    // if yes: which arrow key?
    if (event.keyCode === 38) {
        moveStart('up')
    } else if (event.keyCode === 40) {
        moveStart('down')
    } else if (event.keyCode === 37) {
        moveStart('left')
    } else if (event.keyCode === 39) {
        moveStart('right')
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

const livesDiv = document.createElement('div')
const updateLives = (lives) => {
    livesDiv.innerText = 'Lives: ' + lives.toString()
}
document.body.appendChild(livesDiv)
updateLives(state.lives)



state.segments.push(segmentFactory())

//creates the game piece
// const createGamePiece = () => {
const gamePiece = document.createElement('div');
gamePiece.style.width = config.userWidth + 'px';
gamePiece.style.height = config.userHeight + 'px';
gamePiece.style.background = config.userColor;
gamePiece.style.position = 'absolute';
gamePiece.style.left = state.location.x + 'px';
gamePiece.style.top = state.location.y + 'px';
gamePiece.id = 'you';
board.appendChild(gamePiece)
// return gamePiece
//}
// createGamePiece()



const divImage = {
    apple: 'https://stickershop.line-scdn.net/stickershop/v1/product/1745817/LINEStorePC/main.png;compress=true',
    lychee: 'https://www.teisseire.com/media/1740/litchipng.png',
    kiwi: 'https://mightieskiwi.com/content/themes/baileylauerman/assets/media/images/mighties/lg-kiwi-man-spoon.png',
    wormHole: 'https://mystickermania.com/cdn/stickers/rick-and-morty/sticker_2060-512x512.png'
}


const createGoodie = (): Goodie => {
    let image
    let points
    const fruitChoose = getRandomInt(1, 100)
    if (fruitChoose < 33) {
        image = divImage.apple
        points = 25
    } else if (fruitChoose < 66) {
        image = divImage.lychee
        points = 50
    } else {
        image = divImage.kiwi
        points = 100
    }
    const x = getRandomInt(0, config.boardWidth - config.userWidth)
    const y = getRandomInt(0, config.boardHeight - config.userHeight)
    const singleGoodie = {
        x,
        y,
        points,
        image,
        elem: makeSpriteDiv(x, y, image, config, board)
    }

    return singleGoodie
}

state.goodies.push(createGoodie())
state.goodies.push(createGoodie())
state.goodies.push(createGoodie())

// new goodie gets created whenever old goodie gets 'eaten'


const resetGame = () => {
    updateState('reset')
    updateLives(state.lives)
    updateScore(state.score)
}


const resetAfterDeath = () => {
    clearInterval(interval)
    updateState('youDied')
    lifeRemoval()
}
const reset = document.createElement('button')
document.body.appendChild(reset)
reset.innerText = 'Reset!'
reset.style.backgroundColor = config.resetButtonColor
reset.addEventListener('click', resetGame)



const lifeRemoval = () => {
    console.log(state.lives)
    state.lives = state.lives - 1
    console.log(state.lives)
    updateLives(state.lives)
    if (state.lives === 0) {
        alert("GAME OVER")
        resetGame()
    }
}


// 6/3/21
// HW:  eat tail kills you
//HW: Make this work - if gamepiece steps out of bounds, hit reset
const boarderCheck = () => {
    if (state.location.x === config.boardWidth) {
        resetAfterDeath()
    } else if (state.location.x === 0 - config.userWidth) {
        resetAfterDeath()
    } else if (state.location.y === 0 - config.userWidth) {
        resetAfterDeath()
    } else if (state.location.y === config.boardHeight) {
        resetAfterDeath()
    }
}


const tailHitCheck = () => {
    state.segments.forEach(segment => {
        if (
            segment.style.left === state.location.x + 'px' &&
            segment.style.top === state.location.y + 'px'
        ) {
            //debugger
            resetAfterDeath()
            lifeRemoval()
        }
    })

}


// hw:  rounded segments.  
// Random fruit function.  
// - a type of goodie has a consistent type of fruit and a consistent score - DONE
// Can not go backwards to kill yourself
// introduce concept of lives

/**
 * User starts with three lives.
 * Every time the user dies, take away one life.
 * When they die after last life, display game over and reset score to zero.
 * Every 1000 points user gets new life.
 */

/** -Cannot go backwards to die
 * - Make worm holes
 *
 */
