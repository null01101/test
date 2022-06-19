import {
  describe, expect, it,
} from '@jest/globals'
import { Rover } from '../src/models/rover.js'
import { Plateau } from '../src/models/plateau.js'

describe('When a rover moves', () => {
  it('Should advance one grid in the y axis if facing north', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 0], 'N', plateau)

    rover.move()

    expect(rover.location).toEqual([0, 1])
  })

  it('Should advance one grid in the x axis if facing east', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 0], 'E', plateau)

    rover.move()

    expect(rover.location).toEqual([1, 0])
  })

  it('Should retreat one grid in the x axis if facing west', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([1, 0], 'W', plateau)

    rover.move()

    expect(rover.location).toEqual([0, 0])
  })

  it('Should retreat one grid in the x axis if facing west', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([1, 0], 'W', plateau)

    rover.move()

    expect(rover.location).toEqual([0, 0])
  })

  it('Should retreat one grid in the y axis if facing south', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 1], 'S', plateau)

    rover.move()

    expect(rover.location).toEqual([0, 0])
  })
})

describe('When a rover turns', () => {
  it('Should be facing east if its initial direction is north and it turns right', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 1], 'N', plateau)

    rover.turn('R')

    expect(rover.reportPosition()).toEqual('0 1 E')
  })

  it('Should be facing south if its initial direction is east and it turns right', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 1], 'E', plateau)

    rover.turn('R')

    expect(rover.reportPosition()).toEqual('0 1 S')
  })

  it('Should be facing west if its initial direction is south and it turns right', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 1], 'S', plateau)

    rover.turn('R')

    expect(rover.reportPosition()).toEqual('0 1 W')
  })

  it('Should be facing north if its initial direction is west and it turns right', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 1], 'W', plateau)

    rover.turn('R')

    expect(rover.reportPosition()).toEqual('0 1 N')
  })
})

describe('When detecting collisions', () => {
  it('Should not allow a rover to move to a location that already has another rover', () => {
    const plateau = new Plateau([10, 20])
    const idleRover = new Rover([0, 1], 'W', plateau)
    const movingRover = new Rover([0, 0], 'N', plateau)

    plateau.addRoverLocation(idleRover)
    movingRover.move()

    expect(movingRover.reportPosition()).toEqual('0 0 N')
  })

  it('Should not be possible for a rover to fall from the plateau', () => {
    const plateau = new Plateau([10, 20])
    const rover = new Rover([0, 0], 'S', plateau)

    rover.move()

    expect(rover.reportPosition()).toEqual('0 0 S')
  })
})
