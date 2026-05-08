import { isFlush } from "../../src/evaluator"
import { Hand } from "../../src/types"

describe('isFlush', () => {
  test('Should return a boolean', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const flush = isFlush( hand )

    expect( typeof (flush) ).toBe( 'boolean' )
  })

  test('Should return true if flush', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'hearts', rank: 4},
      {suit: 'hearts', rank: 6},
      {suit: 'hearts', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const flush = isFlush( hand )

    expect( flush ).toBe( true )
  })


  test('Should return false if not flush', ()=>{
    const hand: Hand = [
      {suit: 'clubs', rank: 2},
      {suit: 'hearts', rank: 4},
      {suit: 'hearts', rank: 6},
      {suit: 'hearts', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const flush = isFlush( hand )

    expect( flush ).toBe( false )
  })
})