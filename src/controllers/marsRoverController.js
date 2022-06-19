import { Rover } from '../models/rover.js'

const movementActionMap = {
  R: 'turn',
  L: 'turn',
  M: 'move',
}

export const marsRoverController = (plateau, roverInstructions) => {
  let rover
  const roverLocationsLog = []

  roverInstructions.forEach(({
    location, roverDirection, movementCommands,
  }) => {
    const deployedRover = plateau.roverLocations[`${location[0]} ${location[1]}`]

    if (deployedRover) {
      rover = deployedRover
      plateau.removeRoverLocation(`${location[0]} ${location[1]}`)
    } else {
      rover = new Rover(location, roverDirection, plateau)
    }

    movementCommands.forEach((movementCommand) => {
      rover[movementActionMap[movementCommand]](movementCommand)
    })

    plateau.addRoverLocation(rover)
    roverLocationsLog.push(rover.reportPosition())
  })

  return roverLocationsLog
}
