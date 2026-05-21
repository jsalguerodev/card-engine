import { hasFourOfKind } from '../../src/evaluator'
import { Hand } from '../../src/types'

describe('hasFourOfKind', () => {
  test('Should return true if hand has 4 of the same kind', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'clubs', rank: 'A' },
      { suit: 'diamonds', rank: 'A' },
      { suit: 'spades', rank: 'A' },
      { suit: 'hearts', rank: 2 }
    ]

    expect(hasFourOfKind(hand)).toBe(true)

  })

  test('Should return false if hand has no 3 of the same kind', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'clubs', rank: 'A' },
      { suit: 'diamonds', rank: 'J' },
      { suit: 'spades', rank: 2 },
      { suit: 'hearts', rank: 2 }
    ]

    expect(hasFourOfKind(hand)).toBe(false)
  })

  test('Should return false if hand has 3 of the same kind', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'clubs', rank: 'A' },
      { suit: 'diamonds', rank: 'A' },
      { suit: 'spades', rank: 5 },
      { suit: 'hearts', rank: 2 }
    ]

    expect(hasFourOfKind(hand)).toBe(false)
  })
})