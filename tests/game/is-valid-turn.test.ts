import { isValidTurn } from '../../src/game'
import { createGame } from '../../src/state'
import { GameState } from '../../src/types'

const playersIds = [
  'player-1',
  'player-2',
  'player-3'
]

let state: GameState

describe('isValidTurn', () => {

  beforeEach( () => {
    state = createGame( playersIds, 5, 1)
  } )

  test('Should return true for current player', () => {
    const isValid = isValidTurn( state, 'player-1')

    expect( isValid ).toBe( true )
  })

  test('Should return false for other players', () => {
    const isValid = isValidTurn( state, 'player-2')

    expect( isValid ).toBe( false )
  })

  test('Should return false for unknown player id', () => {
    const isValid = isValidTurn( state, 'player-10')

    expect( isValid ).toBe( false )
  })

  test('Should return false if player has finished', () => {
    state.players[0]!.isFinished = true
    const isValid = isValidTurn( state, 'player-1')

    expect( isValid ).toBe( false )
  })
})