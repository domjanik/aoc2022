const fs = require("fs");
const input = fs
  .readFileSync("input_test.txt", "utf8")
  .split('\n');

let monkeyList = [];

let showLogs = false;

class Monkey {
    items;
    divider;
    onConditionMet;
    onConditionNotMet;
    operation;
    thrownItems = BigInt(0);
    constructor(monkey) {
        this.items = monkey[1].replaceAll('  Starting items: ', '').split(', ').map(item => Number(item));
        this.divider = BigInt(monkey[3].replaceAll('  Test: divisible by ', ''));
        this.onConditionMet = BigInt(monkey[4].replaceAll('    If true: throw to monkey ', ''));
        this.onConditionNotMet = BigInt(monkey[5].replaceAll('    If false: throw to monkey ', ''));
        this.operation = (value) => eval(monkey[2].replaceAll('Operation: new = ', '').replaceAll('old', value));
    }

    inspectItems(worryDivider) {
        this.items.forEach((item) => {
            let worryLevel = BigInt(this.operation(item));
            showLogs && console.log('Monkey inspects an item with a worry level of ' + item);
            showLogs && console.log('Worry level after operation is ' + worryLevel);
            worryLevel = worryLevel / worryDivider;
            showLogs && console.log('Monkey gets bored with item. Worry level is divided by 3 to ' + worryLevel); 
            if(worryLevel % this.divider === 0n) {
                showLogs && console.log('Current worry level is divisible by ' + this.divider);
                monkeyList[this.onConditionMet].items.push(worryLevel);
                showLogs && console.log('Item with worry level ' + worryLevel + ' is thrown to monkey ' + this.onConditionMet);

            } else {
                showLogs && console.log('Current worry level is not divisible by ' + this.divider)
                showLogs && console.log('Item with worry level ' + worryLevel + ' is thrown to monkey ' + this.onConditionNotMet);
                monkeyList[this.onConditionNotMet].items.push(worryLevel);
            }
            this.thrownItems++;
        });
        this.items = [];
    }
}

function prepareMonkeys() {
    let monkeysCount = input.length / 7;
    let tempMonkeyList = [];
    for(i = 0; i < monkeysCount; i++) {
        tempMonkeyList.push(input.slice(i*7, (i+1) * 7));

        showLogs && console.log(input.length);
    }
    monkeyList = tempMonkeyList.map((monkey) => {
        return new Monkey(monkey);
    });

}

function executeRounds(roundsCount, worryDivider) {
    showLogs = false;
    for(let i = 0; i< roundsCount; i++) {
        if(i == 19) {
            showLogs = true;
        }
        console.log("Round number: " + i);
        monkeyList.forEach((monkey, monkeyIndex) => {
            showLogs && console.log("Monkey  " + monkeyIndex);
            if(i === 18 && monkeyIndex == 2) {
                console.log(monkey.thrownItems);
                console.log(monkey.items);
            }

            monkey.inspectItems(worryDivider);
        })

        monkeyList.map((monkey, monkeyIndex) => {
            console.log('Monkey ' + monkeyIndex + " inspected items " + monkey.thrownItems + " times and has items : " + monkey.items.join(", "));
        });
    }

    // console.log(monkeyList)
    let monkeyActivity = monkeyList.map(monkey => monkey.thrownItems).sort((a,b) => b > a ? 1 : b == a ? 0 : -1)
    console.log("Multiplify of most active monkeys: " + (monkeyActivity[0] * monkeyActivity[1] ))
}

prepareMonkeys();
// console.log("Part 1: ")
// executeRounds(20, 3n);
console.log("Part 2: ")
executeRounds(20, 1n);
