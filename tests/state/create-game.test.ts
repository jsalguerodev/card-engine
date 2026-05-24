import { createGame } from "../../src/state"

const playersIds = [
  'player-1',
  'player-2',
  'player-3'
]

describe('createGame', () => {
  test('Should throw if less than 2 players', () => {
    const playerIds = [
      'player-1',
    ]

    expect( () => createGame( playerIds, 5, 1) ).toThrow('Game requires at least 2 players')
  })

  test('Should throw if not enough cards for all players', () => {
    const playerIds = [
      'player-1',
      'player-1',
      'player-3',
      'player-4',
      'player-5',
      'player-6',
    ]

    expect( () => createGame( playerIds, 10, 1) )
      .toThrow('Cannot create game: maximum 5 players allowed for 10 cards per player')
  })

  test('Should create the correct number of players', () => {
    const { players } = createGame( playersIds, 5, 1)

    expect ( players.length ).toBe(3)
  })

  test('Should assign the correct number of cards to each player', () => {
    const { players } = createGame( playersIds, 10, 1)

    players.forEach(player => {
      expect( player.hand.length ).toBe(10)
    })
  })

  test('Should set the first player as the current player', () => {
    const { currentPlayerId } = createGame( playersIds, 10, 1)

    expect( currentPlayerId ).toBe('player-1')
  })

  test('Should initialize an empty discard pile', () => {
    const { discardPile } = createGame( playersIds, 10, 1)

    expect(typeof discardPile ).toBe('object')
    expect( discardPile.length ).toBe(0)
  })

  test('Should initialize phase as "playing" and winner as null', () => {
    const { phase, winner } = createGame( playersIds, 10, 1)

    expect( phase ).toBe('playing')
    expect( winner ).toBeNull
  })

  test('Should initialize current round as 1 and initialize max rounds correctly', () => {
    const { currentRound, maxRounds } = createGame( playersIds, 10, 5)

    expect( currentRound ).toBe(1)
    expect( maxRounds ).toBe(5)
  })

  test('Should generate a target score within valid range', () => {
    const { targetScore } = createGame( playersIds, 10, 5)

    expect( targetScore ).toBeGreaterThanOrEqual( 140 )
    expect( targetScore ).toBeLessThanOrEqual( 219 )
  })

  test('Should return a new game state object', () => {
    const game_1 = createGame( playersIds, 10, 5)
    const game_2 = createGame( playersIds, 10, 5)

    expect( game_1) .not.toBe( game_2 )
  })

  test('Should generate different target scores across multiple games', () => {
    const { targetScore: targetScore_1 } = createGame( playersIds, 10, 5)
    const { targetScore: targetScore_2 } = createGame( playersIds, 10, 5)

    expect( targetScore_1) .not.toBe( targetScore_2 )
  })
})
