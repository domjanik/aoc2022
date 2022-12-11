const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n')
  .map((row) => {
    const splittedRow = row.split(' ')
    return {
        method: splittedRow[0],
        args: Number(splittedRow[1])
    }
});

const CYCLES_TO_TRACK = [20, 60, 100, 140, 180, 220];
const DRAWING_CYCLES =  [0,  40, 80,  120, 160, 200];
let DRAWING = []

let drawningCycle = 0;

let cycle = 1;
let register = 1;
let summedCyclesValue = 0;

function drawPixel() {
    if(DRAWING_CYCLES.includes(cycle)) {
        drawningCycle++;
    }
    const pixelInCycle = cycle - DRAWING_CYCLES[drawningCycle] - 1;
    
    if (pixelInCycle == register || pixelInCycle == (register - 1) || pixelInCycle == (register + 1)){
        DRAWING[drawningCycle].push("█");
    } else {
        DRAWING[drawningCycle].push(" ");
    }

    if(cycle <= 10){
        console.log("Position number: " + cycle + " : " + pixelInCycle + " === " + register);
        console.log(DRAWING[0].join(''));
    }
}

function trackCycle() {
    if(CYCLES_TO_TRACK.includes(cycle)) {
        summedCyclesValue += (register * cycle);
        // console.log(`At cycle ${cycle} register has value ${register} and sum is ${summedCyclesValue}`);
    }
}

async function noop() {
    return new Promise((res) => {
        drawPixel()
        trackCycle();
        cycle++;

        res();
    });
}


async function addx(value) {
    return new Promise((res) => {
        for(let i = 2;i>0; i--) {
            drawPixel()
            trackCycle();
            cycle++;
            if(i===1){
                register += value;
            }
        }
        res();
    });
}

function prepareDrawing() {
    const LINES_AMOUNT = 6;
    for(let i = 0; i < LINES_AMOUNT; i++){ 
        DRAWING[i] = [];
    }
}

async function executeCycle() {
    prepareDrawing();
    for (const instruction of input){
        switch(instruction.method) {
            case "noop": 
                await noop()
                break;
            case "addx":
                await addx(instruction.args);
                break;
        }
    }

    test.map((row) => {
        let testRow = row.replaceAll('.', ' ').replaceAll('#', '█')
        console.log(testRow);
    });
    
    console.log('    ')
    console.log('████████████████████████████')
    console.log('    ')
    DRAWING.forEach((row)=> console.log(row.join('')))
}

executeCycle()

const test = ["##..##..##..##..##..##..##..##..##..##..",
"###...###...###...###...###...###...###.",
"####....####....####....####....####....",
"#####.....#####.....#####.....#####.....",
"######......######......######......####",
"#######.......#######.......#######....."]
