export class Plateau {
  constructor(size) {
    this.size = size
    this.roverLocations = {}
  }

  addRoverLocation(rover) {
    this.roverLocations[`${rover.location[0]} ${rover.location[1]}`] = rover
  }

  removeRoverLocation(roverPosition) {
    delete this.roverLocations[roverPosition]
  }
}
