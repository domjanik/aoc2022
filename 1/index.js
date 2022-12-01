const input = require('./input');

function getElvesCalories() {
    return input.reduce((elves, food) => {
        if(food === "") {
            elves.elvesCalories.push(elves.currentlyProcessedElf);
            elves.currentlyProcessedElf = 0;
        } else {
            const foodNum = Number(food)
            elves.currentlyProcessedElf += foodNum;
        }
        return elves;
    }, { elvesCalories: [], currentlyProcessedElf: 0 }).elvesCalories;
}

function reachestElf() {
    return getElvesCalories().sort((a,b) => b-a)[0];
}

function sumOfReachest3() {
    return getElvesCalories().sort((a,b) => b-a).slice(0,3).reduce((prevValue, currentValue) => currentValue+prevValue, 0);
}

console.log("Richest Elf: ", reachestElf());
console.log("Sum of richest 3 Elves: ", sumOfReachest3());