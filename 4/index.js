const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n')
  .map((pair) => pair.split(',').map((area) => {
    const areaTemp = area.split('-');
    const start = Number(areaTemp[0]);
    const end = Number(areaTemp[1]);
    const areaArray = [];
    for(let i = start; i<= end; i++) {
        areaArray.push(i);
    }
    return areaArray;
  }))

function fullyOverlapingPairs() {
    return input.filter((pair) => {
        const summedPair = [...pair[0], ...pair[1]];
        let pairArea = JSON.stringify([...new Set(summedPair)].sort((a,b) => a-b ));
        return pairArea === JSON.stringify(pair[0]) || pairArea === JSON.stringify(pair[1])
    }).length
}

function partialyOverlapingPairs() {
    return input.filter((pair) => {
        const summedPair = [...pair[0], ...pair[1]];
        let pairArea = [...new Set(summedPair)];

        return pairArea.length < summedPair.length;
    }).length
}

console.log('Fully overlaping pairs:' +  fullyOverlapingPairs());
console.log('Partialy overlaping pairs:' +  partialyOverlapingPairs());