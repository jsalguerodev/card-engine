import { getHighestRank } from '../../src/evaluator'
import { Hand } from '../../src/types'

describe('getHighestCard', () => {
  test('Should throw if hand is empty', () => {
    const hand: Hand = []

    expect( () => getHighestRank( hand ) ).toThrow('Hand is empty')
  })

  test('Should return the highest ranked card', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 5},
      {suit: 'clubs', rank: 'J'},
      {suit: 'diamonds', rank: 'K'},
      {suit: 'clubs', rank: 3},
      {suit: 'hearts', rank: 10},
    ]

    const highestCard = getHighestRank( hand )

    expect( highestCard.rank ).toBe( 'K' )

  })

  test('Should return Ace as the highest card', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 5},
      {suit: 'clubs', rank: 'J'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'clubs', rank: 3},
      {suit: 'hearts', rank: 10},
    ]

    const highestCard = getHighestRank( hand )

    expect( highestCard.rank ).toBe( 'A' )
  })

  test('Should not modify hand', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 5},
      {suit: 'clubs', rank: 'J'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'clubs', rank: 3},
      {suit: 'hearts', rank: 10},
    ]

    const handCopy = structuredClone( hand )

    getHighestRank( hand )

    expect( hand ).toEqual( handCopy )
  })
})