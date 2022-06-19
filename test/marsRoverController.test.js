import {
  describe, expect, it,
} from '@jest/globals'
import { marsRoverController } from '../src/controllers/marsRoverController.js'
import { Plateau } from '../src/models/plateau.js'

describe('When moving rovers', () => {
  it('Should allow 2 rovers to move sequentially', () => {
    const plateau = new Plateau([10, 20])

    const roverLocationsLog = marsRoverController(
      plateau,
      [
        {
          location: [1, 2],
          roverDirection: 'N',
          movementCommands: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'],
        },
        {
          location: [3, 3],
          roverDirection: 'E',
          movementCommands: ['M', 'R', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M'],
        },
      ],
    )

    expect(roverLocationsLog).toEqual(['1 3 N', '2 3 S'])
  })

  it('Should not deploy an additional rover if the second command has the coordinates of a deployed rover', () => {
    const plateau = new Plateau([10, 20])

    const roverLocationsLog = marsRoverController(
      plateau,
      [
        {
          location: [1, 2],
          roverDirection: 'N',
          movementCommands: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'],
        },
        {
          location: [1, 3],
          roverDirection: 'N',
          movementCommands: ['M', 'M'],
        },
      ],
    )

    expect(Object.keys(plateau.roverLocations).length).toEqual(1)
    expect(roverLocationsLog).toEqual(['1 3 N', '1 5 N'])
  })
})
