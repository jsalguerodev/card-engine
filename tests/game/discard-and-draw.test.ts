import { discardAndDraw } from "../../src/game"
import { createDeck, shuffleDeck } from "../../src/deck"
import { Deck, Hand, Card } from "../../src/types"

let playDeck: Deck
const cardToDiscard: Card = { suit: 'hearts', rank: 'A' }
const hand: Hand = [
  { suit: 'hearts', rank: "A" }
]

describe('discardAndDraw', () => {
  beforeEach(() => {
    playDeck = createDeck()
    playDeck = shuffleDeck(playDeck)
  })

  test('Should replace the discarded card with the drawn card', () => {
    const { returnHand, drawnCard } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(returnHand).not.toContainEqual(cardToDiscard)
    expect(returnHand).toContainEqual(drawnCard)
  })

  test('Should preserve hand size', () => {
    const { returnHand } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(returnHand.length).toBe(hand.length)
  })

  test('Should preserve the position of the discarded card', () => {
    const { returnHand, drawnCard } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(returnHand[0]).toEqual(drawnCard)
  })

  test('Should not modify original hand', () => {
    const snapshot = [...hand]
9
    discardAndDraw(hand, cardToDiscard, playDeck)

    expect(hand).toEqual(snapshot)
  })

  test('Should return a new hand reference', () => {
    const { returnHand } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(returnHand).not.toBe(hand)
  })

  test('Should throw if discarded card is not in hand', () => {
    const cardToDiscard: Card = { suit: 'hearts', rank: 'K' }

    expect(() => discardAndDraw(hand, cardToDiscard, playDeck)).toThrow('Discarded card not in hand')
  })

  test('Should throw if hand is empty', () => {
    const emptyHand: Hand = []

    expect(() => discardAndDraw(emptyHand, cardToDiscard, playDeck)).toThrow('Hand is empty')
  })

  test('Should throw if deck is empty', () => {
    const emptyDeck: Deck = []

    expect(() => discardAndDraw(hand, cardToDiscard, emptyDeck)).toThrow('Deck is empty')
  })

  test('Should reduce deck size by 1', () => {
    const { remainingDeck } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(remainingDeck.length).toBe(playDeck.length - 1)
  })

  test('Should return a new deck reference', () => {
    const { remainingDeck } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(remainingDeck).not.toBe(playDeck)
  })

  test('Should return the same drawn card that was inserted into the hand', () => {
    const { returnHand, drawnCard } = discardAndDraw(hand, cardToDiscard, playDeck)

    expect(returnHand).toContainEqual(drawnCard)
  })
})