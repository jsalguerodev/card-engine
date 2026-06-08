import { GameState } from "../../src/types"
import { finishPlayer }from "../../src/game"
import { createGame } from "../../src/state"

describe('finishPlayer', () => {
  let state : GameState
  const playerIds = [
    'Player-1', 'Player-2', 'Player-3'
  ]

  beforeEach ( () => {
    state = createGame( playerIds, 5, 3 )
  })

  test('Should throw if player does not exist', () => {

    expect( () => finishPlayer( state, 'Player-10'))
      .toThrow('Player-10 does not exist in game')
  })

  test('Should throw if it is not the player\'s turn', () => {

    expect( () => finishPlayer( state, 'Player-2'))
      .toThrow('it is not Player-2\'s turn. It is Player-1\'s turn')
  })

  test('Should throw if player is already finished', () => {
    state.players[0]!.isFinished = true

    expect( () => finishPlayer( state, 'Player-1'))
      .toThrow('Player-1 has already finished')
  })

  test('Should mark the player as finished', () => {
    const playerId = 'Player-1'
    const { players } = finishPlayer( state, playerId)

    const playerIndex = players.findIndex( plyr => plyr.id === playerId)

    expect( players[ playerIndex ]?.isFinished ).toBe( true )
  })

  test('Should advance turn', () => {
    const { currentPlayerId } = finishPlayer( state, 'Player-1')

    expect( currentPlayerId ).toBe( 'Player-2' )
  })

  test('Should not modify the player\'s hand', () => {
    const playerHand = state.players[0]!.hand
    const { players } = finishPlayer( state, 'Player-1')

    expect ( players[0]!.hand ).toEqual( playerHand )
  })

  test('Should return a new state object', () => {
    const newState = finishPlayer( state, 'Player-1')

    expect( newState ).not.toBe( state )
  })

  test('Should not modify original state', () => {
    const snapshot = structuredClone( state )
    finishPlayer( state, 'Player-1')

    expect( state ).toEqual( snapshot )
  })
})