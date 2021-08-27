import { getRandomInt } from "./getRandomInt"
import { makeSpriteDiv } from "./makeSpriteDiv"

export type Wormhole = {
    x: number,
    y: number,
    image: string,
    elem: HTMLDivElement,
    oneOrTwo: string
}

export const createWormHole = (oneOrTwo: string, config, board): Wormhole => {
    const image = 'https://mystickermania.com/cdn/stickers/rick-and-morty/sticker_2060-512x512.png'
    const x = getRandomInt(0, config.boardWidth - config.userWidth)
    const y = getRandomInt(0, config.boardHeight - config.userHeight)
    const wormHoleShape = {
        x,
        y,
        image,
        elem: makeSpriteDiv(x, y, image, config, board),
        oneOrTwo
    }

    return wormHoleShape
}