const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n')
  .map(row => row.split('').map(tree => ({visible: false, height: tree, points: 0})));

function checkHighestToRight(rowIndex, columnIndex, height) {
    let isHighest = true;
    let points = 0;
    for(let i = columnIndex + 1; i < input[0].length; i++) {
        if(isHighest) {
            points++;
        }
        if(input[rowIndex][i].height >= height) {
            isHighest = false;
        }
    }
    return { isHighest, points };
}  

function checkHighestToLeft(rowIndex, columnIndex, height) {
    let isHighest = true;
    let points = 0;
    for(let i = columnIndex - 1; i >= 0 ; i--) {
        if(isHighest) {
            points++;
        }
        if(input[rowIndex][i].height >= height) {
            isHighest = false;
        } 
    }
    return { isHighest, points };
}  


function checkHighestToTop(rowIndex, columnIndex, height) {
    let isHighest = true;
    let points = 0;
    for(let i = rowIndex - 1; i >= 0; i-- ) {
        if(isHighest) {
            points++;
        }
        if(input[i][columnIndex].height >= height) {
            isHighest = false;
        } 
    }
    return { isHighest, points };
}  

function checkHighestToBottom(rowIndex, columnIndex, height) {
    let isHighest = true;
    let points = 0;

    for(let i = rowIndex + 1; i < input.length; i++) { 
        if(isHighest) {
            points++;
        }
        if(input[i][columnIndex].height >= height) {
            isHighest = false;
        }
    }
    return { isHighest, points };
}  
function findVisibleTrees() {
    let highestPoints = 0;
    input.forEach((row, rowIndex) => {
        row.forEach((_, columnIndex) => {
            const tree = input[rowIndex][columnIndex];
            if(columnIndex == 0 || rowIndex == 0 || rowIndex === (input.length-1) || columnIndex == (input[0].length - 1)) {
                tree.visible = true;
            } else {
                const highestInLeft = checkHighestToLeft(rowIndex, columnIndex, tree.height)
                const highestInRight = checkHighestToRight(rowIndex, columnIndex, tree.height);
                const highestInTop = checkHighestToTop(rowIndex, columnIndex, tree.height) 
                const highestInBottom = checkHighestToBottom(rowIndex, columnIndex, tree.height);
                tree.points = highestInTop.points * highestInLeft.points * highestInBottom.points * highestInRight.points;
                if(tree.points > highestPoints) {
                    highestPoints = tree.points;
                }
                if (highestInLeft.isHighest || highestInRight.isHighest || highestInBottom.isHighest || highestInTop.isHighest) {
                    tree.visible = true;
                }
            }
        })
    })
    console.log('Highest Points: ' + highestPoints);
}



var r = /true/g;
findVisibleTrees()
console.log("Visible Trees: " + JSON.stringify(input).match(r).length + " " +  (JSON.stringify(input).match(r).length == 1805))