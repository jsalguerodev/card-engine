import { dealCards } from "../../src/dealer";
import { createDeck } from "../../src/deck";
import { Deck, Card } from "../../src/types";

describe('dealCards', () => {

  let initialDeck: Deck

  beforeEach(() => {
    initialDeck = createDeck()
  })

  const getCardId = (card: Card): string => {
    return `${card.suit}-${card.rank}`
  }

  test('Should not modify original deck', () => {
    const snapshot = [...initialDeck]

    const options = {
      deck: initialDeck,
      numberOfPlayers: 3,
      cardsPerPlayer: 5
    }

    dealCards(options)

    expect(initialDeck).toEqual(snapshot)
  })

  test('Should throw an error if not enough cards', () => {

    const options = {
      deck: initialDeck,
      numberOfPlayers: 10,
      cardsPerPlayer: 10
    }

    expect(() => dealCards(options)).toThrow()
  })

  test('Should return a different reference', () => {

    const options = {
      deck: initialDeck,
      numberOfPlayers: 3,
      cardsPerPlayer: 5
    }

    const { remainingDeck } = dealCards(options)

    expect(remainingDeck).not.toBe(initialDeck)
  })

  test('Should return a correct number of hands', () => {
    const numberOfPlayers = 5

    const options = {
      deck: initialDeck,
      numberOfPlayers,
      cardsPerPlayer: 5
    }

    const result = dealCards(options)

    expect(result.hands.length).toBe(numberOfPlayers)
  })

  test('Should return a correct number of cards per hand', () => {
    const cardsPerPlayer = 5

    const options = {
      deck: initialDeck,
      numberOfPlayers: 3,
      cardsPerPlayer: cardsPerPlayer
    }

    const result = dealCards(options)

    // console.log( result.hands )

    result.hands.forEach(hand => {
      expect(hand.length).toBe(cardsPerPlayer)
    })

  })

  test('Should deal a correct total amount of cards', () => {
    const options = {
      deck: initialDeck,
      numberOfPlayers: 3,
      cardsPerPlayer: 5
    }

    const result = dealCards(options)
    let cardsInHands = 0

    result.hands.forEach(hand => {
      cardsInHands += hand.length
    })

    const totalCards = cardsInHands + result.remainingDeck.length

    expect(totalCards).toBe(initialDeck.length)
  })

  test('Contains unique cards', () => {

    const options = {
      deck: initialDeck,
      numberOfPlayers: 3,
      cardsPerPlayer: 5
    }

    const { hands, remainingDeck: resultDeck } = dealCards(options)
    let remainingDeck = [...resultDeck]

    hands.forEach(hand => {
      remainingDeck = [...remainingDeck, ...hand]
    })

    const uniqueKeysMap = remainingDeck.map(card => getCardId(card))
    const uniqueKeysSet = new Set(uniqueKeysMap)

    expect(uniqueKeysMap.length).toBe(uniqueKeysSet.size)
  })

  test('Should contain all cards from initial deck', () => {

    const options = {
      deck: initialDeck,
      numberOfPlayers: 3,
      cardsPerPlayer: 5
    }

    const { hands, remainingDeck } = dealCards(options)

    let resultDeck = [...remainingDeck]
    hands.forEach(hand => {
      resultDeck = [...resultDeck, ...hand]
    })

    const originalDeckMap = initialDeck.map(card => getCardId(card))
    const resultDeckMap = resultDeck.map(card => getCardId(card))

    expect([...resultDeckMap].sort()).toEqual([...originalDeckMap].sort())
  })
})