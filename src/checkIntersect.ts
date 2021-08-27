type Thing = {
    x: number,
    y: number
}

export const checkIntersect = (thing1:Thing, thing2:Thing): boolean => {
    return thing1.x === thing2.x && thing1.y === thing2.y 
}
