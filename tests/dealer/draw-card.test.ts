import { drawCard } from "../../src/dealer"
import { createDeck } from "../../src/deck";
import { Deck, Card } from "../../src/types";

describe('drawCard', () => {

  let initialDeck: Deck

  beforeEach(() => {
    initialDeck = createDeck()
  })


  test('Should not modify original deck', () => {
    const snapshot = [...initialDeck]

    drawCard(initialDeck)

    expect(initialDeck).toEqual(snapshot)
  })

  test('Should reduce deck by one card', () => {
    const { remainingDeck } = drawCard(initialDeck)

    expect(remainingDeck.length).toBe(initialDeck.length - 1)
  })

  test('Should return a different reference', () => {
    const { remainingDeck } = drawCard(initialDeck)

    expect(remainingDeck).not.toBe(initialDeck)
  })

  test('Should throw an error if empty deck', () => {
    expect(() => drawCard([])).toThrow()
  })

  test('Should return the last card', () =>{
    const { card } = drawCard(initialDeck)

    expect(card).toBe( initialDeck[initialDeck.length - 1] )
  })
})