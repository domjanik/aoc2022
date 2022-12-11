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
    agilityModifier
    constructor(monkey) {
        this.items = monkey[1].replaceAll('  Starting items: ', '').split(', ').map(item => BigInt(item));
        this.divider = BigInt(monkey[3].replaceAll('  Test: divisible by ', ''));
        this.onConditionMet = BigInt(monkey[4].replaceAll('    If true: throw to monkey ', ''));
        this.onConditionNotMet = BigInt(monkey[5].replaceAll('    If false: throw to monkey ', ''));

        let toExecute = monkey[2].replaceAll('  Operation: new = ', '');
        this.agilityModifier = toExecute.split(' ')[2] === 'old' ? 'old' : BigInt(toExecute.split(' ')[2]);

        this.operation = (value) => {
            if(toExecute.includes("+")) {
                if(this.agilityModifier === 'old') {
                    return value + value;
                } else {
                    return value + this.agilityModifier; 
                }
            } else {
                if(this.agilityModifier === 'old') {
                    return value * value;
                } else {
                    return this.agilityModifier * value;
                }
            }
            // let operationToExecute = .replaceAll('old', value);
            // console.log(operationToExecute);
            return eval(operationToExecute);
        };
    }

    inspectItems(worryDivider) {
        this.items.forEach((item) => {
            let worryLevel = BigInt(this.operation(item));
            worryLevel = worryLevel / worryDivider;
            // showLogs && console.log('item: ' + item + " worryLevel: " + worryLevel + " Dividable :" + (worryLevel % this.divider === 0n) + " goes to Monkey " + (worryLevel % this.divider === 0n ? this.onConditionMet : this.onConditionNotMet))
            if(worryLevel % this.divider === 0n) {
                monkeyList[this.onConditionMet].items.push(worryLevel);

            } else {
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
    for(let i = 1; i<= roundsCount; i++) {
        // console.log("Round number: " + i);
        if(i === 16) {
            showLogs = true;
        } else {
            showLogs = false
        }
        monkeyList.forEach((monkey, monkeyIndex) => {
            // showLogs && console.log('Monkey : ' + monkeyIndex + " ( " + monkey.thrownItems + " )")
            monkey.inspectItems(worryDivider);
        })

        // monkeyList.map((monkey, monkeyIndex) => {
            // console.log('Monkey ' + monkeyIndex + " inspected items " + monkey.thrownItems + " times");
        // });
    }

    let monkeyActivity = monkeyList.map(monkey => monkey.thrownItems).sort((a,b) => b > a ? 1 : b == a ? 0 : -1)
    console.log("Multiplify of most active monkeys: " + (monkeyActivity[0] * monkeyActivity[1] ))
}

prepareMonkeys();
// console.log("Part 1: ")
// executeRounds(20, 3n);
console.log("Part 2: ")
executeRounds(1000, 1n);
