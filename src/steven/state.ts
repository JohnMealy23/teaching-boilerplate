import { createWormHole, Wormhole } from "../createWormHole"

export const config = {
    boardHeight: 300,
    boardWidth: 300,
    boardColor: 'blue',
    userColor: 'orange',
    tailColor: 'red',
    moveDistance: 10,
    userWidth: 10,
    userHeight: 10,
    goodieColor: 'purple',
    resetButtonColor: 'red',
    defaultLives: 3
}

export type Goodie = {
    x: number;
    y: number;
    points: number;
    image: string;
    elem: HTMLDivElement;
}

export type State = {
    location: {
        x: number;
        y: number;
    }
    goodies: Goodie[]
    wormHoles: {
        one: Wormhole;
        two: Wormhole;
    }
    moving: boolean;
    score: number;
    segments: HTMLDivElement[];
    lives: number;
    pointPlus: number;
    pointCache: number;
}
export const getState = (config: any, board: any) => {
    const state: State = {
        location: {
            x: 0,
            y: 0
        },
        goodies: [] as any[],
        wormHoles: {
            one: createWormHole('one', config, board),
            two: createWormHole('two', config, board)
        },
        moving: false,
        score: 0,
        segments: [] as HTMLDivElement[],
        lives: config.defaultLives,
        pointPlus: 200,
        pointCache: 0
    }
    return state;
}