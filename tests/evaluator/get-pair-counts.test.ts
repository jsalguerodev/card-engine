import { getPairCounts } from '../../src/evaluator'
import { Hand } from '../../src/types'

describe('getPairCounts', () => {
  test('Should return 1 if one pair in hand', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 2 },
      { suit: 'clubs', rank: 2 },
      { suit: 'diamonds', rank: 6 },
      { suit: 'spades', rank: 'J' },
      { suit: 'hearts', rank: 9 }
    ]

    const pairCount = getPairCounts(hand)
    expect(pairCount).toBe(1)
  })

  test('Should return 2 if two pairs in hand', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 2 },
      { suit: 'clubs', rank: 2 },
      { suit: 'diamonds', rank: 6 },
      { suit: 'spades', rank: 6 },
      { suit: 'hearts', rank: 9 }
    ]

    const pairCount = getPairCounts(hand)
    expect(pairCount).toBe(2)
  })

  test('Should return 0 if no pair in hand', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 2 },
      { suit: 'clubs', rank: 4 },
      { suit: 'diamonds', rank: 6 },
      { suit: 'spades', rank: 'J' },
      { suit: 'hearts', rank: 9 }
    ]

    const pairCount = getPairCounts(hand)
    expect(pairCount).toBe(0)
  })

  test('Should return 1 if one pair and three of the same kind in hand', () => {
    const hand: Hand = [
      { suit: 'hearts', rank: 2 },
      { suit: 'clubs', rank: 2 },
      { suit: 'diamonds', rank: 6 },
      { suit: 'spades', rank: 6 },
      { suit: 'hearts', rank: 6 }
    ]

    const pairCount = getPairCounts(hand)
    expect(pairCount).toBe(1)
  })
})