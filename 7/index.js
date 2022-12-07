const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n')

const DIRECTORY_SIZE_CAP = 100000;
const TOTAL_DISC_SPACE = 70000000 - 30000000;
class Directory {
    name;
    size;
    children;
    parent;
    constructor(name, size, parent) {
        this.name = name;
        this.size = size;
        this.parent = parent;
        this.children = [];
    }

    addChildren(children) {
        this.children.push(children);
        this.updateSize(children.size);
    }

    updateSize(size) {
        this.size += size;
        if (this.name != '/') {
            this.parent.updateSize(size);
        }
    }
    
    removeParent() {
        const temp = {...this};
        temp.parent = null;
        if (temp.children) {
            temp.children = temp.children.map((child) => child.removeParent());
        }
        return temp;
    }
}

function generateFileTree() {
    const tree = new Directory('/', 0, null);
    let currentDirectory = tree;     
    input.forEach((log) => {
        if (log.includes('$ cd')) {
            const logParts = log.split(' ');
            if (logParts[2] === '..') {
                currentDirectory = currentDirectory.parent;
            } else {
                currentDirectory = currentDirectory.children.find((child) => child.name === logParts[2]) || currentDirectory;
            }
        } else if(log.includes('$ ls')) {
            return;
        } else {
            const logParts = log.split(' ');
            if(logParts[0] === 'dir') {
                currentDirectory.addChildren(new Directory(logParts[1], 0, currentDirectory));
            } else {
                currentDirectory.updateSize(Number(logParts[0]));
            }
        }
    }) 
    return tree;
}

function findSmallInputDirectoriesSize() {
    return generateFileTree();
}

var r = /\d+/g;
const directorySizes = JSON.stringify(findSmallInputDirectoriesSize().removeParent()).match(r)
const missingSpace = Number(TOTAL_DISC_SPACE) - Number(directorySizes[0]);
console.log('Small directories space: ', directorySizes.filter((size) => size <= DIRECTORY_SIZE_CAP).reduce((prevVal, currVal) => prevVal+Number(currVal),0));
console.log('Overall directories space: ', directorySizes[0]);
console.log('Missing size: ', -missingSpace);
console.log('Directory size to remove: ', directorySizes.filter((size) => {
    const diff = Number(directorySizes[0]) - Number(size);
    const wouldFit = diff <= Number(TOTAL_DISC_SPACE);
    return diff > 0 && wouldFit;
}).sort((a, b) => a-b)[0]);