import { GameState } from '../../src/types'
import { createGame } from '../../src/state'
import { getWinner } from '../../src/game/get-winner'
import * as scoreHand from '../../src/evaluator/score-hand'

describe('getWinner', () => {
  let state : GameState
  const playerIds = [
    'Player-1', 'Player-2', 'Player-3'
  ]

  beforeEach( () => {
    state = createGame( playerIds, 5, 1)
    state.targetScore = 40
    state.phase = 'finished'
  })

  afterEach( () => {
    vi.restoreAllMocks()
  })


  test('Should return the player with score equal to target score', () => {
    vi.spyOn( scoreHand, 'scoreHand' )
      .mockReturnValueOnce( 40 )
      .mockReturnValueOnce( 38 )
      .mockReturnValueOnce( 17 )

    const winner = getWinner( state )

    expect( winner.id ).toBe( 'Player-1' )
  })

  test('Should return the player with the closest score below target score', () => {
    vi.spyOn( scoreHand, 'scoreHand' )
      .mockReturnValueOnce( 1 )
      .mockReturnValueOnce( 30 )
      .mockReturnValueOnce( 28 )

    const winner = getWinner( state )

    expect( winner.id ).toBe( 'Player-2' )
  })

  test('Should return the player with the highest card rank in hand when all scores exceed target score', () => {
    state.players[0]!.hand[0]!.rank = 'A'
    state.players[1]!.hand.forEach( card => card.rank = 2 )
    state.players[2]!.hand.forEach( card => card.rank = 2 )

    vi.spyOn( scoreHand, 'scoreHand' )
      .mockReturnValueOnce( 41 )
      .mockReturnValueOnce( 42 )
      .mockReturnValueOnce( 43 )

    const winner = getWinner( state )

    expect( winner.id ).toBe( 'Player-1' )
  })

  test('Should return the player with the closest score when just one player overscores target score', () => {
    state.players[0]!.hand[0]!.rank = 'A'
    state.players[1]!.hand.forEach( card => card.rank = 2 )
    state.players[2]!.hand.forEach( card => card.rank = 2 )

    vi.spyOn( scoreHand, 'scoreHand' )
      .mockReturnValueOnce( 41 )
      .mockReturnValueOnce( 39 )
      .mockReturnValueOnce( 38 )

    const winner = getWinner( state )

    expect( winner.id ).toBe( 'Player-2' )
  })

  test('Should return the player with the highest card rank in hand when multiple players have the same score', () => {
    state.players[0]!.hand.forEach( card => card.rank = 2 )
    state.players[1]!.hand[0]!.rank = 'A'
    state.players[2]!.hand.forEach( card => card.rank = 2 )

    vi.spyOn( scoreHand, 'scoreHand' )
      .mockReturnValueOnce( 40 )
      .mockReturnValueOnce( 40 )
      .mockReturnValueOnce( 40 )

    const winner = getWinner( state )

    expect( winner.id ).toBe( 'Player-1' )
  })

  test('Should return the first player in turn order when players remain tied after comparing highest card', () => {
    state.players[0]!.hand[0]!.rank = 'A'
    state.players[1]!.hand[0]!.rank = 'A'
    state.players[2]!.hand[0]!.rank = 'A'

    vi.spyOn( scoreHand, 'scoreHand' )
      .mockReturnValueOnce( 40 )
      .mockReturnValueOnce( 40 )
      .mockReturnValueOnce( 40 )

    const winner = getWinner( state )

    expect( winner.id ).toBe( 'Player-1' )
  })

  test('Should throw if state is not finished', () => {
    state.phase = 'playing'
    expect( () => getWinner( state ) ).toThrow( 'Game is not finished' )
  })
})