const fs = require("fs");
let startingPoint;
let endPoint;

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line, rowIndex) => {
    return line
        .split('')
        .map((height, columnIndex) => {
            if (height == 'S') {
                startingPoint = {x: columnIndex, y: rowIndex};
                height = 'a';
            } else if (height == 'E') {
                endPoint = {x: columnIndex, y: rowIndex};
                height = 'z';
            }
            return height.charCodeAt(0)-97;
        })
    })

function findAdjacentFields(x, y, res = []) {
    // up
    if (x < input[0].length-1  && input[y][x+1] <= input[y][x]+1) {
        res.push({x: x+1, y: y});
    }
    // right
    if (y < input.length-1  && input[y+1][x] <= input[y][x]+1) {
        res.push({x: x, y: y+1});
    }
    // down
    if (y > 0 && input[y-1][x] <= input[y][x]+1) {
        res.push({x: x, y: y-1});
    }
     // left
     if (x > 0 && input[y][x-1] <= input[y][x]+1) {
        res.push({x: x-1, y: y});
    }
    return res;
}

function fillAdjecentFields(distMap, x, y, steps) {
    if (distMap[y][x] <= steps) {
        return;
    } else {
        distMap[y][x] = steps;
        findAdjacentFields(x, y)
            .forEach(p => fillAdjecentFields(distMap, p.x, p.y, steps+1));
    }
}

const calculateDistance = startingPoint => {
    let distMap = [];
    for(let rowIterator = 0;rowIterator < input.length; rowIterator++) {
        distMap.push([]);
    }
    fillAdjecentFields(distMap, startingPoint.x, startingPoint.y, 0);
    return distMap[endPoint.y][endPoint.x];
}

const findShortestStart = () => {
    let min;
    input.forEach((row, rowIndex) => row.forEach((height, columnIndex) => {
        if (height == 0) {
            let distance = calculateDistance({x: columnIndex, y:rowIndex});
            if (min != undefined && distance) {
                min = Math.min(min, distance)
            } else if(min === undefined) { 
                min = distance
            };
        }
    }))
    return min;
}

let shortestRoute = calculateDistance(startingPoint);
console.log("Shortest route: ", shortestRoute);
console.log("Shortest start route: ", findShortestStart(shortestRoute));