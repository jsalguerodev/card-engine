import { getRankCounts } from "../../src/evaluator"
import { Hand } from "../../src/types"

describe('getRankCounts', () => {

  test('Should return count 1 for unique ranks', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const rankCounts = getRankCounts( hand )

    Object.entries(rankCounts).forEach( ([rank, count]) => {
      expect(count).toBe(1)
    })
  })

  test('Should return count 2 for a pair', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts[2]).toBe(2)
  })

  test('Should return count 2 for two pairs', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 6},
      {suit: 'hearts', rank: 9}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts[2]).toBe(2)
    expect(rankCounts[6]).toBe(2)
  })

  test('Should return count 3 for three of a kind', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 2},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts[2]).toBe(3)
  })

  test('Should return count 4 for four of a kind', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 2},
      {suit: 'spades', rank: 2},
      {suit: 'hearts', rank: 9}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts[2]).toBe(4)
  })

  test('Should return count 5 for five equal ranks', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 2},
      {suit: 'diamonds', rank: 2},
      {suit: 'spades', rank: 2},
      {suit: 'hearts', rank: 2}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts[2]).toBe(5)
  })

  test('Should count multiple rank groups correctly', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 'A'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'spades', rank: 2},
      {suit: 'hearts', rank: 2}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts['A']).toBe(3)
    expect(rankCounts[2]).toBe(2)
  })

  test('Should count facecard ranks correctly', ()=>{
    const hand: Hand = [
      {suit: 'hearts', rank: 'A'},
      {suit: 'clubs', rank: 'A'},
      {suit: 'diamonds', rank: 'A'},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 'J'}
    ]

    const rankCounts = getRankCounts( hand )

    expect(rankCounts['A']).toBe(3)
    expect(rankCounts['J']).toBe(2)
  })
})
