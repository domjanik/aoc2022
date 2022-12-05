const creates = require('./creates.json');

const fs = require("fs");
const moveset = fs
  .readFileSync("moveset.txt", "utf8")
  .replaceAll('move', '')
  .replaceAll('from', ',')
  .replaceAll('to', ',')
  .replaceAll(' ', '')
  .split('\n')
  .map((row) => {
    const tempRow = row.split(',');
    return {
        amount: Number(tempRow[0]),
        from: Number(tempRow[1]),
        to: Number(tempRow[2])
    }
  });

function applyMoveset() {
    let cratesInProgress = [...creates];
    moveset.forEach((move) => {
        for(let i = move.amount; i--; i > 0) {
            let sourceRow = cratesInProgress[move.from - 1];
            let targetRow = cratesInProgress[move.to - 1];
            targetRow.push(sourceRow[sourceRow.length - 1])
            sourceRow = sourceRow.splice(-1);
        }
    })
    console.log('CraneMover 9000')
    console.table(cratesInProgress);
    return cratesInProgress;
}


function applyMoveset9001() {
    let cratesInProgress = [...creates];
    moveset.forEach((move) => {
        let sourceRow = cratesInProgress[move.from - 1];
        let targetRow = cratesInProgress[move.to - 1];

        const index = sourceRow.length - move.amount;
        const toMoveArray = sourceRow.splice(index);

        targetRow.push(...toMoveArray)
    })
    console.log('CraneMover 9001')
    console.table(cratesInProgress);
    return cratesInProgress;
}
console.log('Top containers in CraneMover 9000: ', applyMoveset().map((row) => row[row.length - 1]).join(''));
console.log('Top containers in CraneMover 9001: ', applyMoveset9001().map((row) => row[row.length - 1]).join(''));