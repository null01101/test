import inquirer from 'inquirer'
import { Plateau } from './models/plateau.js'
import { marsRoverController } from './controllers/marsRoverController.js'

const app = async () => {
  const { plateauSize } = await inquirer.prompt([
    {
      type: 'input',
      name: 'plateauSize',
      message: 'What\'s the plateau size',
      validate: (value) => {
        if (!value.match(/^\d+\s\d+$/)) return 'Invalid plateau size, examples of correct input: "20 40", "10 15"...'
        return true
      },
    },
  ])

  const [xPlateauSize, yPlateauSize] = plateauSize.split(' ')

  const plateau = new Plateau([+xPlateauSize, +yPlateauSize])

  let moreInputs = true
  const roverInstructions = []

  do {
    // eslint-disable-next-line no-await-in-loop
    const { roverLocation, roverMovements, isMoreInputsNeeded } = await inquirer.prompt([
      {
        type: 'input',
        name: 'roverLocation',
        message: 'What\'s the location of the rover',
        validate: (value) => {
          if (!value.match(/^\d+\s\d+\s([NWSE])+$/)) return 'Invalid rover location, examples of correct rover locations: "20 40 N", "10 15 W"...'

          const [x, y] = value.split(' ')

          if (x > plateau.size[0] || y > plateau.size[1]) return 'Invalid rover location, the rover cannot be deployed outside the plateau'

          return true
        },
      },
      {
        type: 'input',
        name: 'roverMovements',
        message: 'What commands do you want to issue',
        validate: (value) => {
          if (!value.match(/^([RLM])+$/)) return 'Invalid rover commands, examples of correct rover commands: "RMLMMMR", "MMMLLMMRM"...'
          return true
        },
      },
      {
        type: 'confirm',
        name: 'isMoreInputsNeeded',
        message: 'Do you wish to add more rover commands',
        default: true,
      },
    ])

    const [xRoverLocation, yRoverLocation, roverDirection] = roverLocation.split(' ')

    roverInstructions.push({
      location: [+xRoverLocation, +yRoverLocation],
      roverDirection,
      movementCommands: roverMovements.split(''),
    })

    moreInputs = isMoreInputsNeeded
  } while (moreInputs)

  const roverLocationsLog = marsRoverController(plateau, roverInstructions)

  console.log('\nRovers movement log:\n')
  roverLocationsLog.forEach((movement) => console.log(movement))
  console.log('\n')
}

await app()
