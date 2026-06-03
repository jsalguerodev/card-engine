import { GameState } from "../../src/types"
import { advanceTurn } from "../../src/game"
import { createGame } from "../../src/state"

let playerIds : string[] = []

describe ('advanceTurn', () => {
  beforeEach(() => {
    playerIds = [
      'player-1',
      'player-2'
    ]
  })

  test('Should advance to the next player', () => {
    const originalGame = createGame(playerIds, 5, 1)

    const { currentPlayerId } = advanceTurn( originalGame )

    expect( currentPlayerId ).toBe('player-2')
  })

  test('Should wrap around to the first player', () => {
    const originalGame = createGame(playerIds, 5, 2)

    const firstTurnGame = advanceTurn( originalGame )
    const { currentPlayerId } = advanceTurn( firstTurnGame )

    expect( currentPlayerId ).toBe('player-1')
  })

  test('Should increment round when wrapping around', () => {
    const originalGame = createGame(playerIds, 5, 2)

    const firstTurnGame = advanceTurn( originalGame )
    const { currentRound }= advanceTurn( firstTurnGame )

    expect( currentRound ).toEqual(2)
  })

  test('Should set phase to finished when max rounds are reached and turn wraps around', () => {
    const originalGame = createGame(playerIds, 5, 1)

    const firstTurnGame = advanceTurn( originalGame )
    const { phase } = advanceTurn( firstTurnGame )

    expect( phase ).toBe( 'finished' )
  })

  test('Should not increment round when advancing to the next player', () => {
    const originalGame = createGame(playerIds, 5, 1)

    const {currentRound }  = advanceTurn( originalGame )

    expect( currentRound ).toEqual( 1 )
  })

  test('Should not modify the original state', () => {
    const originalGame = createGame(playerIds, 5, 2)

    const snapshot = structuredClone(originalGame)

    advanceTurn(originalGame)

    expect(originalGame).toEqual(snapshot)
  })

  test('Should skip finished players', () => {
    playerIds.push('player-3')

    const originalGame = createGame(playerIds, 5, 2)

    originalGame.players[1]!.isFinished = true

    const { currentPlayerId } = advanceTurn(originalGame)

    expect(currentPlayerId).toEqual('player-3')
  })

  test('Should set phase to finished when all players are finished', () => {
    playerIds.push('player-3')
    const originalGame = createGame(playerIds, 5, 1)

    originalGame.players[0]!.isFinished = true
    originalGame.players[1]!.isFinished = true
    originalGame.players[2]!.isFinished = true

    const { phase } = advanceTurn( originalGame )

    expect( phase ).toBe('finished')
  })

  test('Should return a new state object', () => {
    const originalGame = createGame(playerIds, 5, 1)

    const firstTurnGame = advanceTurn( originalGame )

    expect( firstTurnGame ).not.toBe( originalGame )
  })

  test('Should throw if phase is not valid', () => {
    const originalGame = createGame(playerIds, 5, 1)
    originalGame.phase = 'finished'

    expect( () => advanceTurn( originalGame )).toThrow('The game phase is not valid. Please include a playing game')
  })
})