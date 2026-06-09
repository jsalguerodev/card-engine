import { createGame } from "../../src/state"
import { applyTurn } from "../../src/game"
import { GameState, ApplyTurnOptions } from "../../src/types"

describe('applyTurn', () => {
  let state : GameState
  const playerIds = [
    'Player-1', 'Player-2', 'Player-3'
  ]

  const getDefaultOptions = (): ApplyTurnOptions => ({
    finish: false,
    drawSource: 'deck',
    cardToDiscard: state.players[0]!.hand[0]!
  })

  beforeEach ( () => {
    state = createGame( playerIds, 5, 3 )
  })

  test('Should throw if phase is not playing', () => {
    state.phase = 'finished'

    expect( () => applyTurn( state, 'Player-10', getDefaultOptions() ))
      .toThrow('Game is not in playing phase')
  })

  test('Should throw if player does not exist', () => {

    expect( () => applyTurn( state, 'Player-10', getDefaultOptions() ))
      .toThrow('Player-10 does not exist in the game')
  })

  test('Should throw if it is not the player\'s turn', () => {

    expect( () => applyTurn( state, 'Player-2', getDefaultOptions() ))
      .toThrow('it is not Player-2\'s turn. It is Player-1\'s turn')
  })

  test('Should throw if player is already finished', () => {
    state.players[0]!.isFinished = true

    expect( () => applyTurn( state, 'Player-1', getDefaultOptions() ))
      .toThrow('Player-1 has already finished')
  })

  test('Should throw if discard pile is empty when drawing from discard pile', () => {
    state.discardPile = []
    const options: ApplyTurnOptions  = {
      finish: false,
      drawSource: 'discardPile',
      cardToDiscard: state.players[0]!.hand[0]!
    }

    expect( () => applyTurn( state, 'Player-1', options ))
      .toThrow('Discard pile is empty. Cannot draw from discard pile')
  })

  test('Should throw if deck is empty when drawing from deck', () => {
    state.remainingDeck = []

    expect( () => applyTurn( state, 'Player-1', getDefaultOptions() ))
      .toThrow('Deck is empty. Cannot draw from deck')
  })

  test('Should mark player as finished when finish is true', () => {
    const options: ApplyTurnOptions = { finish: true }
    const { players } = applyTurn( state, 'Player-1', options )

    expect(players[0]!.isFinished).toBe(true)
  })

  test('Should advance turn when player finishes', () => {
    const options: ApplyTurnOptions = { finish: true }
    const { currentPlayerId } = applyTurn( state, 'Player-1', options )

    expect(currentPlayerId).toBe('Player-2')
  })

  test('Should advance turn after player draws', () => {
    const { currentPlayerId } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect(currentPlayerId).toBe('Player-2')
  })

  test('Should draw from deck when draw source is deck', () => {
    const { remainingDeck } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect(remainingDeck.length).toBe(state.remainingDeck.length - 1)
  })

  test('Should draw from discard pile when draw source is discard pile', () => {
    const options: ApplyTurnOptions  = {
      finish: false,
      drawSource: 'discardPile',
      cardToDiscard: state.players[0]!.hand[0]!
    }

    state.discardPile.push( {suit: 'spades', rank: 'A'} )

    const { discardPile } = applyTurn( state, 'Player-1', options )

    expect(discardPile.length).toBe(state.discardPile.length)
  })

  test('Should add discarded card to discard pile', () => {
    const options: ApplyTurnOptions  = {
      finish: false,
      drawSource: 'deck',
      cardToDiscard: state.players[0]!.hand[0]!
    }

    const { discardPile } = applyTurn( state, 'Player-1', options )

    expect(discardPile.length).toBe(state.discardPile.length + 1)
    expect(discardPile[discardPile.length - 1]).toEqual(options.cardToDiscard)
  })

  test('Should return a new game state reference', () => {
    const newState = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect( newState ).not.toBe( state )
  })

  test('Should not modify original state', () => {
    const snapshot = structuredClone( state )
    applyTurn( state, 'Player-1', getDefaultOptions() )

    expect( state ).toEqual( snapshot )
  })

  test('Should preserve target score', () => {
    const { targetScore } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect( targetScore ).toBe( state.targetScore )
  })

  test('Should preserve max rounds', () => {
    const { maxRounds } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect( maxRounds ).toBe( state.maxRounds )
  })

  test('Should set winner when the game ends', () => {

  })

  test('Should update the player hand after drawing and discarding', () => {
    const player1Snapshot = structuredClone(state.players[0])

    const { players } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect( players[0]!.hand ).not.toBe( player1Snapshot!.hand )
  })

  test('Should preserve hand size after drawing and discarding', () => {
    const player1Snapshot = structuredClone(state.players[0])

    const { players } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect( players[0]!.hand.length ).toBe( player1Snapshot!.hand.length )
  })

  test('Should preserve all unaffected players', () => {
    const player2Snapshot = structuredClone(state.players[1])
    const player3Snapshot = structuredClone(state.players[2])

    const { players } = applyTurn( state, 'Player-1', getDefaultOptions() )

    expect(players[1]).toEqual(player2Snapshot)
    expect(players[2]).toEqual(player3Snapshot)
  })
})