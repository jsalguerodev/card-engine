import { scoreHand, getCardScore } from "../../src/evaluator"
import { Hand } from "../../src/types"

describe('scoreHand', () => {
  test('Should return base score with no bonuses', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 32 )
  })

  test('Should apply flush bonus', () =>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'hearts', rank: 4},
      {suit: 'hearts', rank: 6},
      {suit: 'hearts', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 52 )
  })

  test('Should apply run bonus', () =>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'hearts', rank: 3},
      {suit: 'diamonds', rank: 6},
      {suit: 'hearts', rank: 5}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 35 )
  })

  test('Should apply pair bonus', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 40 )
  })

  test('Should apply three of a kind bonus', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 2},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 51 )
  })

  test('Should apply four of a kind bonus', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 2},
      {suit: 'spades', rank: 2},
      {suit: 'hearts', rank: 9}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 65 )
  })

  test('Should apply double Ace bonus', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 'A'}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 42 )
  })

  test('Should apply double Ace and pair bonuses', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'A'},
      {suit: 'hearts', rank: 'A'}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 65 )
  })

  test('Should stack multiple bonuses correctly', () =>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'hearts', rank: 2},
      {suit: 'hearts', rank: 2},
      {suit: 'hearts', rank: 'J'},
      {suit: 'hearts', rank: 'A'}
    ]

    const handScore = scoreHand( hand )

    expect( handScore ).toBe( 81 )
  })
})


//* Should return base score with no bonuses
//* Should apply flush bonus
//* Should apply run bonus
//* Should apply pair bonus
//* Should apply three of a kind bonus
//* Should apply four of a kind bonus
//* Should apply single Ace bonus
//* Should apply double Ace bonus
//* Should stack multiple bonuses correctly