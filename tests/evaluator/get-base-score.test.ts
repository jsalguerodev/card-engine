import { getBaseScore } from "../../src/evaluator"
import { Hand } from "../../src/types"

describe ('getBaseScore', () => {
  test('Should return 0 if empty hand', () => {
    const hand : Hand = []

    const baseScore = getBaseScore( hand )

    expect( baseScore ).toBe(0)
  })

  test('Should return the card value if single card', () => {
    const hand: Hand = [{ suit: 'hearts', rank: 10 }]

    const baseScore = getBaseScore( hand )

    expect( baseScore ).toBe( 10 )
  })

  test('Should return the hand score', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 5},
      {suit: 'clubs', rank: 'J'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'clubs', rank: 3},
      {suit: 'hearts', rank: 10},
    ]

    const baseScore = getBaseScore( hand )

    expect(baseScore).toBe(43)
  })
})