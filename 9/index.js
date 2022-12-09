const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split('\n')
  .map(row => {
    const val = row.split(' ');
    return {
        direction: val[0],
        distance: val[1]
    };
});

class RopeEnd{
    x = 0;
    y = 0;

    visitedFields = ["0,0"]

    applyMove(direction, coords) {
        if(coords) {
            this.x = coords.x;
            this.y = coords.y;
        } else {
            switch (direction) {
                case "D":
                    this.y--;
                    break;
                case "U":
                    this.y++;
                    break;
                case "L":
                    this.x--;
                    break;
                case "R":
                    this.x++;
                    break;
            }
        }
        this.visitedFields.push(this.x +","+ this.y);
    }

    findDistance(x,y) {
        let diffX = Math.abs(this.x - x);
        let diffY = Math.abs(this.y - y);

        return {x: diffX, y: diffY};
    }
}

class Rope {
    tailSegments = [
    ];

    constructor(tailSegments) {
        for(let i=0;i<tailSegments; i++) {
            this.tailSegments.push(new RopeEnd());
        }
    }

    getPrevPosition(prevSegment, direction) {
        switch (direction) {
            case "D":
                return {x: prevSegment.x, y: prevSegment.y + 1};
            case "U":
                return {x: prevSegment.x, y: prevSegment.y - 1};
            case "L":
                return {x: prevSegment.x + 1, y: prevSegment.y };
            case "R":
                return {x: prevSegment.x - 1, y: prevSegment.y };
        }
    }

    applyMove(move, moveId) {
        let testPrevPosition;
        this.tailSegments.forEach((tailSegment, index) => {
            if(index == 0) {
                testPrevPosition = {x: tailSegment.x, y: tailSegment.y};
                tailSegment.applyMove(move.direction);
            } else {
                let prevSegment = this.tailSegments[index-1];
                let diff = tailSegment.findDistance(prevSegment.x, prevSegment.y);
                
                if (diff.x > 1 || diff.y > 1) {
                    tailSegment.applyMove(null, {x: testPrevPosition.x, y: testPrevPosition.y});
                }
                testPrevPosition = {x: tailSegment.x, y: tailSegment.y};
            }
        })
    }
}

function calcTailPositions() {
    const rope = new Rope(2);

    input.forEach((move) => {
        for(let i=0; i < move.distance; i++) {
            rope.applyMove(move, i);
        }
    })

    return [...new Set(rope.tailSegments[rope.tailSegments.length - 1].visitedFields)].length;
}

console.log("Tail positions: " + calcTailPositions());