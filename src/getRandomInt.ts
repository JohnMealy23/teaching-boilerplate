export function getRandomInt(min, max) {
    const num = Math.random() * (max - min + 1) + min // 44.123
    const rounded = Math.floor(num); //44
    const toTheTens = Math.floor(rounded / 10) * 10
    return toTheTens

}