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
        let diffX = this.x - x;
        let diffY = this.y - y;

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

    applyMove(move, moveId, stepId) {
        let testPrevPosition;
        this.tailSegments.forEach((tailSegment, index) => {
            if(index == 0) {
                testPrevPosition = {x: tailSegment.x, y: tailSegment.y};
                tailSegment.applyMove(move.direction);
            } else {
                let prevSegment = this.tailSegments[index-1];
                let diff = tailSegment.findDistance(prevSegment.x, prevSegment.y);
                let tempPrevPos = {x: tailSegment.x,y: tailSegment.y};
                if (Math.abs(diff.x) > 1 || Math.abs(diff.y) > 1) {
                    if(diff.x > 0) {
                        tempPrevPos.x--;
                    } else if (diff.x < 0) {
                        tempPrevPos.x++;
                    }
                    if(diff.y > 0)  {
                        tempPrevPos.y--;
                    } else if(diff.y < 0) {
                        tempPrevPos.y++;
                    }
                    tailSegment.applyMove(null, {x: tempPrevPos.x
                        , y: tempPrevPos.y});
                }
                testPrevPosition = {x: tempPrevPos.x, y: tempPrevPos.y};
            }
        })
    }
}

function calcTailPositions(segments) {
    const rope = new Rope(segments);

    input.forEach((move, moveId) => {
        for(let i=0; i < move.distance; i++) {
            rope.applyMove(move, moveId,i);
        }
    })

    return [...new Set(rope.tailSegments[rope.tailSegments.length - 1].visitedFields)].length;
}

console.log("Tail positions with 2 segments: " + calcTailPositions(2));
console.log("Tail positions with 10 segments: " + calcTailPositions(10));