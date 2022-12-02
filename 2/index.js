const input = require('./input');

const SHAPE_POINTS = {
    Y: 2,
    X: 1,
    Z: 3 
};

const RESULT_POINTS = {
    WIN: 6,
    DRAW: 3,
    LOSE: 0
};

const SHAPE_RESULT_P1 = {
    "A X": RESULT_POINTS.DRAW + SHAPE_POINTS.X,
    "A Y": RESULT_POINTS.WIN + SHAPE_POINTS.Y,
    "A Z": RESULT_POINTS.LOSE + SHAPE_POINTS.Z,
    "B X": RESULT_POINTS.LOSE + SHAPE_POINTS.X,
    "B Y": RESULT_POINTS.DRAW + SHAPE_POINTS.Y,
    "B Z": RESULT_POINTS.WIN + SHAPE_POINTS.Z,
    "C X": RESULT_POINTS.WIN + SHAPE_POINTS.X,
    "C Y": RESULT_POINTS.LOSE + SHAPE_POINTS.Y,
    "C Z": RESULT_POINTS.DRAW + SHAPE_POINTS.Z,
}

const SHAPE_RESULT_P2 = {
    "A X": RESULT_POINTS.LOSE + SHAPE_POINTS.Z,
    "A Y": RESULT_POINTS.DRAW + SHAPE_POINTS.X,
    "A Z": RESULT_POINTS.WIN + SHAPE_POINTS.Y,
    "B X": RESULT_POINTS.LOSE + SHAPE_POINTS.X,
    "B Y": RESULT_POINTS.DRAW + SHAPE_POINTS.Y,
    "B Z": RESULT_POINTS.WIN + SHAPE_POINTS.Z,
    "C X": RESULT_POINTS.LOSE + SHAPE_POINTS.Y,
    "C Y": RESULT_POINTS.DRAW + SHAPE_POINTS.Z,
    "C Z": RESULT_POINTS.WIN + SHAPE_POINTS.X,
}

function p1() {
    return input.reduce((prevVal, currVal) => { 
        return prevVal += SHAPE_RESULT_P1[currVal];
    }, 0);
}

function p2() {
    return input.reduce((prevVal, currVal) => { 
        return prevVal += SHAPE_RESULT_P2[currVal];
    }, 0);
}

console.log("Your points in p1: " + JSON.stringify(p1()))
console.log("Your points in p2: " + JSON.stringify(p2()))