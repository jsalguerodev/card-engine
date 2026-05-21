import { getAceBonus } from '../../src/evaluator'
import { Hand } from '../../src/types'

describe ('getAceBonus', () => {
  test('Should return 5 if one ace', () => {

    const hand: Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const aceBonus = getAceBonus( hand )

    expect(aceBonus).toBe(5)
  })

  test('Should return 15 if two aces', () => {

    const hand: Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 'A'},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const aceBonus = getAceBonus( hand )

    expect(aceBonus).toBe(15)
  })

  test('Should return 15 if more than two aces', () => {

    const hand: Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 'A'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'spades', rank: 'A'},
      {suit: 'hearts', rank: 9}
    ]

    const aceBonus = getAceBonus( hand )

    expect(aceBonus).toBe(15)
  })

  test('Should return 0 if no aces', () => {

    const hand: Hand = [
      {suit: 'hearts', rank: 'J'},
      {suit: 'clubs', rank: 'J'},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const aceBonus = getAceBonus( hand )

    expect(aceBonus).toBe(0)
  })
})