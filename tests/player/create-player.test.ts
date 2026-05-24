import { createPlayer } from '../../src/player'
import { Hand } from '../../src/types'

const hand: Hand = [
  {suit: 'hearts', rank: 2},
  {suit: 'clubs', rank: 4},
  {suit: 'diamonds', rank: 6},
  {suit: 'spades', rank: 'J'},
  {suit: 'hearts', rank: 9}
]

const options = {
  id: 'jsalguero.dev',
  hand: hand
}

describe('createPlayer', () => {

  test('Should create a player with the correct id', () => {
    const {id} = createPlayer( options )

    expect(id).toBe(options.id)
  })

  test('Should create a player with the provided hand', () => {
    const {hand: outHand} = createPlayer( options )

    expect(outHand).toStrictEqual(options.hand)
  })

  test('Should return a new player object', () => {
    const playerA = createPlayer(options)
    const playerB = createPlayer(options)

    expect(playerA).not.toBe(playerB)
  })

  test('Should not modify the original hand', () => {
    const handSnapshot = [...hand]

    const {hand: playerHand} = createPlayer( options )

    expect(playerHand).not.toBe(handSnapshot)
    expect(playerHand).not.toBe(hand)
  })

  test('Should allow empty hands', () => {
    const options = {
      id: 'jsalguero.dev',
     hand: []
    }

    const player = createPlayer( options )

    expect(() => createPlayer(options)).not.toThrow()
  })
})
