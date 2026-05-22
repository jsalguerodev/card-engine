import { compareHands } from '../../src/evaluator'
import { Hand } from '../../src/types'

describe ('compareHands', () => {
  test('Should return 1 if first hand wins', () => {
    const firstHand : Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 'A'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'spades', rank: 'Q'},
      {suit: 'hearts', rank: 'Q'}
    ]

    const secondHand : Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 3},
      {suit: 'diamonds', rank: 4},
      {suit: 'spades', rank: 5},
      {suit: 'hearts', rank: 6}
    ]

    const result = compareHands( firstHand, secondHand )

    expect(result).toBe( 1 )
  })

  test('Should return -1 if second hand wins', () => {
    const firstHand : Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 3},
      {suit: 'diamonds', rank: 4},
      {suit: 'spades', rank: 5},
      {suit: 'hearts', rank: 6}
    ]

    const secondHand : Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 'A'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'spades', rank: 'Q'},
      {suit: 'hearts', rank: 'Q'}
    ]

    const result = compareHands( firstHand, secondHand )

    expect(result).toBe( -1 )
  })

  test('Should return 0 on tie', () => {
    const firstHand : Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 3},
      {suit: 'diamonds', rank: 4},
      {suit: 'spades', rank: 5},
      {suit: 'hearts', rank: 6}
    ]

    const secondHand : Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 3},
      {suit: 'diamonds', rank: 4},
      {suit: 'spades', rank: 5},
      {suit: 'hearts', rank: 6}
    ]

    const result = compareHands( firstHand, secondHand )

    expect(result).toBe( 0 )
  })
})
