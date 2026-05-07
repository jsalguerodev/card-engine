import { getCardScore } from "../../src/evaluator";
import { Card } from "../../src/types";

describe('getCardScore', () => {
  test('Should return a value between 2 and 14', () => {
    const testCases : Card[] = [
      { suit: 'hearts', rank: 2 },
      { suit: 'hearts', rank: 10 },
      { suit: 'hearts', rank: 'J' },
      { suit: 'hearts', rank: 'Q' },
      { suit: 'hearts', rank: 'K' },
      { suit: 'hearts', rank: 'A' }
    ]

    testCases.forEach( card => {
      const score = getCardScore(card)
      expect(score).toBeGreaterThanOrEqual(2)
      expect(score).toBeLessThanOrEqual(14)
    })
  })

  test('Should return the correct score - number cards', () => {
    const testCases : Card[] = [
      { suit: 'hearts', rank: 2 },
      { suit: 'hearts', rank: 3 },
      { suit: 'hearts', rank: 4 },
      { suit: 'hearts', rank: 5 },
      { suit: 'hearts', rank: 6 },
      { suit: 'hearts', rank: 7 },
      { suit: 'hearts', rank: 8 },
      { suit: 'hearts', rank: 9 },
      { suit: 'hearts', rank: 10 }
    ]

    testCases.forEach( card => {
      const score = getCardScore(card)
      expect(score).toBe(card.rank)
    })
  })

  test('Should return the correct score - face cards', () => {
    const score_J = getCardScore( {
      suit: "hearts",
      rank: 'J'
    })

    const score_Q = getCardScore( {
      suit: "hearts",
      rank: 'Q'
    })

    const score_K = getCardScore( {
      suit: "hearts",
      rank: 'K'
    })


    expect(score_J).toBe(11)
    expect(score_Q).toBe(12)
    expect(score_K).toBe(13)
  })

  test('Should return the correct score - ace card', () => {
    const score_A = getCardScore( {
      suit: "hearts",
      rank: 'A'
    })

    expect(score_A).toBe(14)
  })
})