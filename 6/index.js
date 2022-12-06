const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n')

function checkSegments(segmentSize) {
    return input.map(row => row.split('').map((charInRow, index) => {
        if(index < 4) {
            return null;
        } else {
            const prevSegment = [...new Set(row.slice(index - segmentSize + 1, index+1).split(''))];
            if(prevSegment.length === segmentSize) {
                return {
                    char: charInRow,
                    position: index + 1
                };
            } else {
                return null;
            }
        }
    }).filter((res) => res)).map(row => row[0]);
}

console.log('P1: ' + checkSegments(4)[0].position);
console.log('P2: ' + checkSegments(14)[0].position);
