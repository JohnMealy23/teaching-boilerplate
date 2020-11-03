// Create four buttons: 'up', 'right', 'down', 'left'
// Create a div that is 1000 pixels by 1000 pixels, with a blue background
// Inside the div, create a child div that is 10 pixels by 10 pixels, has an orange background, and has an id of "you"
// Create an object called state that looks like { x: 0, y: 0 }
// Add functionality so that when a user
// clicks 'up' the value of state.y increases by 1
// clicks 'right' the value of state.x increases by 1
// clicks 'down' the value of state.y decreases by 1
// clicks 'left' the value of state.x decreases by 1
// clicks any button, "you"'s position inside of its parent div is adjusted to reflect the values of state.
// clicks, "you" never leaves the bounds of the parent div.

const config = {
    boardHeight: 150,
    boardWidth: 100,
    boardColor: 'blue',
    userColor: 'orange',
    moveDistance: 5,
    userWidth: 20,
    userHeight: 10,
    goodieColor: 'purple'
}
const goodies = [
    {
        x: 50,
        y: 50
    },
    {
        x: 90,
        y: 70
    }
]
const state = { x: 0, y: 0 }
const updateState = (direction) => {
    if (direction === 'up' && state.y > 0) {
        state.y = state.y - config.moveDistance
    } else if (direction === 'down' && state.y < config.boardHeight - config.userHeight) {
        state.y = state.y + config.moveDistance
    } else if (direction === 'left' && state.x > 0) {
        state.x = state.x - config.moveDistance
    } else if (direction === 'right' && state.x < config.boardWidth - config.userWidth) {
        state.x = state.x + config.moveDistance
    }
    console.log(state)
    divsDiv.style.left = state.x + 'px'
    divsDiv.style.top = state.y + 'px'
    goodies.forEach(goodie => {
        if (goodie.x === state.x && goodie.y === state.y) {
            alert('YAY')
        }
    })
}
let moving: any = false

const buttonFactory = (direction) => {
    const element = document.createElement('button')
    document.body.appendChild(element)
    element.innerText = direction
    element.addEventListener('click', () => {
        if (!moving) {
            moving = setInterval(() => {
                updateState(direction)
            }, 100)
        } else {
            clearInterval(moving)
            moving = false
        }


    })
}
buttonFactory('up')
buttonFactory('down')
buttonFactory('left')
buttonFactory('right')

var div = document.createElement("div");
div.style.width = config.boardWidth + 'px';
div.style.height = config.boardHeight + 'px';
div.style.background = config.boardColor;
div.style.position = "relative";
document.body.appendChild(div)

var divsDiv = document.createElement("div");
divsDiv.style.width = config.userWidth + 'px';
divsDiv.style.height = config.userHeight + 'px';
divsDiv.style.background = config.userColor;
divsDiv.style.position = "absolute";
divsDiv.style.left = "0px";
divsDiv.style.top = "0px";
divsDiv.id = "you";
div.appendChild(divsDiv)

goodies.forEach(goodie => {
    const goodieElem = document.createElement("div")
    div.appendChild(goodieElem)
    goodieElem.style.width = config.userWidth + 'px';
    goodieElem.style.height = config.userHeight + 'px';
    goodieElem.style.background = config.goodieColor;
    goodieElem.style.position = "absolute";
    goodieElem.style.left = goodie.x + 'px';
    goodieElem.style.top = goodie.y + 'px';
    if(config.userWidth + goodie.x > config.boardWidth){
        throw new Error('Goodie will appear off the board')
    }
})




