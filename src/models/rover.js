export class Rover {
  constructor(initialLocation, initialDirection, plateauRef) {
    this.location = initialLocation
    this.direction = initialDirection
    this.plateauRef = plateauRef
  }

  turn(direction) {
    const turnMap = {
      N: { R: 'E', L: 'W' },
      W: { R: 'N', L: 'S' },
      S: { R: 'W', L: 'E' },
      E: { R: 'S', L: 'N' },
    }

    this.direction = turnMap[this.direction][direction]
  }

  move() {
    const moveMap = {
      N: [this.location[0], this.location[1] + 1],
      W: [this.location[0] - 1, this.location[1]],
      S: [this.location[0], this.location[1] - 1],
      E: [this.location[0] + 1, this.location[1]],
    }

    const potentialMove = moveMap[this.direction]

    if (this.isAllowedMove(potentialMove)) { this.location = potentialMove }
  }

  isAllowedMove(potentialMove) {
    if (
      potentialMove[0] > this.plateauRef.size[0]
      || potentialMove[0] < 0
      || potentialMove[1] > this.plateauRef.size[1]
      || potentialMove[1] < 0
      || this.plateauRef.roverLocations[`${potentialMove[0]} ${potentialMove[1]}`]
    ) {
      return false
    }
    return true
  }

  reportPosition() {
    return `${this.location[0]} ${this.location[1]} ${this.direction}`
  }
}
