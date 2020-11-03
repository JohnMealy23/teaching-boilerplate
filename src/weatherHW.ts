
import { printWeather, init } from './weather'
import { languageArray } from './languageArray'
import { radioTemp } from './tempChoice'

const messageInput = document.createElement('input')
document.body.appendChild(messageInput)

const messageButton = document.createElement('button')
document.body.appendChild(messageButton)
messageButton.innerText = 'Submit'
messageButton.addEventListener('click', () => {
    const languageAbr = dropDownLanguage.options[dropDownLanguage.selectedIndex].value
    // get the inputted value
    const userCity = messageInput.value
    // feed into printWeather
    const units = getUnits()

    printWeather(userCity, languageAbr, units)
})


const getRadioButtons = () => {
    const inputs = document.querySelectorAll('input')
    const radioButtons: any = []  //use ": any" to get rid of shit TS doesn't like
    debugger
    for (let i = 0; i < inputs.length; i++) {
        console.log(i, inputs[i])
        const element = inputs[i]
        if (element.type === 'radio') {

            radioButtons.push(element)
        }
    }
    return radioButtons
}
const getUnits = () => {
    const radioButtons = getRadioButtons()
    const checkedButton = radioButtons.find(checkedCb)
    const checkedUnits = checkedButton.value
    return checkedUnits
}
const checkedCb = (radioButtonItem) => {
    return radioButtonItem.checked
}


//when you do queryselectorAll itll give you an array like object. 

const dropDownLanguage = document.createElement('select')
document.body.appendChild(dropDownLanguage)
dropDownLanguage.id = 'Hello'


const makeOption = (languageObj) => {
    // {
    //     language: 'English',
    //     abbreviation:'en'
    // },

    const option = document.createElement('option')
    option.innerText = languageObj.language
    option.value = languageObj.abbreviation
    dropDownLanguage.appendChild(option)
}

languageArray.forEach(makeOption)

radioTemp('Fahrenheit', 'imperial')
radioTemp('Celsius', 'metric')



//how do I look into the NPM node module?
init()


/*
const messageInput = document.createElement('input')
document.body.appendChild(messageInput)

// create button:
const messageButton = document.createElement('button')
document.body.appendChild(messageButton)
messageButton.innerText = 'Submit'
messageButton.addEventListener('click', () => {
    console.log(messageInput)
    const message = {
        name: user.name.first + ' ' + user.name.last,
        text: messageInput.value,
        timeStamp: new Date
    }
    user.messages.push(message)

    displayMessages(message)
    console.log(user.messages)
})
*/

//HW:  add radio buttons that determin if the output is in F vs C


const dups = [
    0, 0, 1, 2, 5, 1, 13, 5, 21, 21, 25
]
const dupsReducer = (accumulator: number[], arrayItem) => {
    if (accumulator.includes(arrayItem) === false) {
        accumulator.push(arrayItem)
    }


    return accumulator
}
const answer = dups.reduce(dupsReducer, [])

const reducedDups = [0, 1, 2, 5, 13, 21, 25]

console.log({ answer, reducedDups })

// output third array composed of numbers that are not shared between the two arrays:
// these are called algorithms 
const array1 = [1, 2, 5, 8, 10, 21]
const array2 = [2, 8, 21, 22, 25, 27]

const newAnswer = [1, 5, 10, 22, 25, 27]


const hwArray = (firstAr, secondAr) => {
    const reduceConcat = []
    const firstArReducer = (acc1: number[], item: number) => {
        // if item is found in array2, dont push into new array.
        if (!secondAr.includes(item) && !acc1.includes(item)) {
            acc1.push(item)
        }
        return acc1
    }

    firstAr.reduce(firstArReducer, reduceConcat)
    secondAr.reduce(firstArReducer, reduceConcat) //can we rerun through firstarReducer twice and change the inputs
    //
    const secondArReducer = (acc2: number[], item: number) => {
        // if item is found in array2, dont push into new array.
        if (!firstAr.includes(item) && !acc2.includes(item)) {
            acc2.push(item)
        }
        return acc2
    }
    secondAr.reduce(secondArReducer, reduceConcat)


    return reduceConcat
}

const finalAnswer = hwArray(array1, array2)




console.log({ newAnswer, finalAnswer })