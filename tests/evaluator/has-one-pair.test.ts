import { hasOnePair } from '../../src/evaluator'
import { Hand } from '../../src/types'

describe('hasOnePair', () => {
  test('Should return true if hand has only one pair', () => {

    const hand: Hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'clubs', rank: 'A' },
      { suit: 'diamonds', rank: 'J' },
      { suit: 'spades', rank: 2 },
      { suit: 'hearts', rank: 3 }
    ]

    expect( hasOnePair(hand) ).toBe(true)
  })

  test('Should return false if hand has two pairs', () => {

    const hand: Hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'clubs', rank: 'A' },
      { suit: 'diamonds', rank: 'J' },
      { suit: 'spades', rank: 2 },
      { suit: 'hearts', rank: 2 }
    ]

    expect( hasOnePair(hand) ).toBe(false)
  })

  test('Should return false if hand no pairs', () => {

    const hand: Hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'clubs', rank: 'Q' },
      { suit: 'diamonds', rank: 'J' },
      { suit: 'spades', rank: 2 },
      { suit: 'hearts', rank: 5 }
    ]

    expect( hasOnePair(hand) ).toBe(false)
  })
})