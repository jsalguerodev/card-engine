import { canPlay } from '../../src/game'
import { Hand, Card } from '../../src/types'

describe ('canPlay', () => {
  test('Should return true if player has card', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const card : Card = { suit: 'hearts', rank: 2 }

    expect( canPlay( hand, card ) ).toBe( true )
  })

  test('Should return false if player does not have card', () => {

    const hand: Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const card : Card = { suit: 'hearts', rank: 2 }

    expect( canPlay( hand, card ) ).toBe( false )
  })

  test('Should return false for empty hand', () => {

    const hand : Hand = []
    const card : Card = { suit: 'hearts', rank: 2 }

    expect( canPlay( hand, card ) ).toBe( false )
  })
})