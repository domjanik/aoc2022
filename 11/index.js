const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n');
let dividers = [];
let monkeyList = [];

class Monkey {
    items;
    divider;
    onConditionMet;
    onConditionNotMet;
    operation;
    thrownItems = BigInt(0);
    agilityModifier
    constructor(monkey) {
        this.items = monkey[1].replaceAll('  Starting items: ', '').split(', ').map(item => BigInt(parseInt(item)));
        this.divider = BigInt(monkey[3].replaceAll('  Test: divisible by ', ''));
        dividers.push(this.divider);
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
            let test = worryLevel % dividers.reduce((prev, curr)=> prev*curr , 1n);
            if(test % this.divider === 0n) {
                monkeyList[this.onConditionMet].items.push(test);

            } else {
                monkeyList[this.onConditionNotMet].items.push(test);
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
    }
    monkeyList = tempMonkeyList.map((monkey) => {
        return new Monkey(monkey);
    });

}

function executeRounds(roundsCount, worryDivider) {
    for(let i = 1; i<= roundsCount; i++) {
        monkeyList.forEach((monkey, monkeyIndex) => {
            monkey.inspectItems(worryDivider);
        })
    }

    let monkeyActivity = monkeyList.map(monkey => monkey.thrownItems).sort((a,b) => b > a ? 1 : b == a ? 0 : -1)
    console.log("Multiplify of most active monkeys: [" +monkeyActivity[0]+ "]" + "[" +  monkeyActivity[1]+ "] "  +  (monkeyActivity[0] * monkeyActivity[1] ))
}

prepareMonkeys();
console.log("Part 1: ")
executeRounds(20, 3n);
console.log("Part 2: ")
executeRounds(10000, 1n);
