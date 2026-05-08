import { isRun } from "../../src/evaluator"
import { Hand } from "../../src/types"

describe ('isRun', ()=>{
  test('Should return a boolean', () => {
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const flush = isRun( hand )

    expect( typeof (flush) ).toBe( 'boolean' )
  })

  test('Should return true if run - ordered ranks', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 9},
      {suit: 'hearts', rank: 10},
      {suit: 'hearts', rank: 'J'},
      {suit: 'hearts', rank: 'Q'},
      {suit: 'hearts', rank: 'K'}
    ]

    const flush = isRun( hand )

    expect( flush ).toBe( true )
  })

  test('Should return true if run - unordered ranks', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 5},
      {suit: 'hearts', rank: 8},
      {suit: 'hearts', rank: 7},
      {suit: 'hearts', rank: 4},
      {suit: 'hearts', rank: 6}
    ]

    const flush = isRun( hand )

    expect( flush ).toBe( true )
  })

  test('Should return false if not run', ()=>{
    const hand: Hand = [
      {suit: 'clubs', rank: 2},
      {suit: 'hearts', rank: 4},
      {suit: 'hearts', rank: 6},
      {suit: 'hearts', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const flush = isRun( hand )

    expect( flush ).toBe( false )
  })
})