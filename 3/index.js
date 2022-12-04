const input = require('./input');

POINTS = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h:8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26,
    A: 27, B: 28, C: 29, D: 30, E: 31, F: 32, G: 33, H: 34, I: 35, J: 36, K: 37, L: 38, M: 39, N: 40, O: 41, P: 42, Q: 43, R: 44, S: 45, T: 46, U: 47, V: 48, W: 49, X: 50, Y: 51, Z: 52
}

function calcDoubledItemsPriority() {
    return input.map((rucksack) => {
        return rucksack.split("").reduce((prevVal, currVal, index) => {
            if(index < rucksack.length / 2) {
                prevVal[currVal] ? prevVal[currVal]++ : prevVal[currVal] = 1
            } else { 
                if(prevVal[currVal] > 0) {
                    return currVal;
                }
            }
            return prevVal;
        }, {})
    }).reduce((prevVal, currVal) => prevVal + POINTS[currVal], 0)
}

function calcGroupedDoubledItemsPriority() {
    return input.reduce((prevVal, currVal, index) => {
        if(index % 3 === 0) {
            prevVal.push([currVal]);
        } else {
            prevVal[prevVal.length - 1].push(currVal);
        }
        return prevVal;
    }, []).map((rucksackGroup) => {
        return rucksackGroup.map((rucksack) => rucksack.split("").reduce((prevVal, currVal, index) => {
            prevVal[currVal] ? prevVal[currVal]++ : prevVal[currVal] = 1
            return prevVal;
        }, {})).reduce((prevVal, currVal) => {
            Object.keys(currVal).forEach( key => {
                prevVal[key] ? prevVal[key]++ : prevVal[key] = 1;
            })
            return prevVal;
        }, {})
    }).reduce((prevVal, currVal) => {
        const commonItem = Object.keys(currVal).filter((key) => {
            return currVal[key] === 3;
        })[0]
        prevVal.push(commonItem);
        return prevVal;
    }, []).reduce((prevVal, currVal) => {
        return prevVal + POINTS[currVal]
    }, 0)
}
console.log("p1 priority: ", calcDoubledItemsPriority());
console.log("p2 priority: ", calcGroupedDoubledItemsPriority());