import { createDeck, shuffleDeck } from "../../src/deck"
import { Deck, Card } from "../../src/types"

describe ('shuffleDeck', () => {

  let originalDeck: Deck
  let shuffledDeck : Deck

  beforeEach(() =>{
    originalDeck = createDeck()
    shuffledDeck = shuffleDeck(originalDeck)
  })

  const getCardId = (card : Card) : string => {
    return `${card.suit}-${card.rank}`
  }

  test ('Should return an array', () => {
    expect(Array.isArray(shuffledDeck)).toBe(true)
  })

  test ('Should return 52 cards', () => {
    expect(shuffledDeck.length).toBe(52)
  })

  test ('Should not modify original deck', () => {
    const baseDeck = createDeck()

    expect(originalDeck).toEqual(baseDeck)

  })

  test ('Should return a new deck instance', () => {
    expect(shuffledDeck).not.toBe(originalDeck)
  })

  test ('At least one card should change position', () => {
    let changedCards = 0
    for (let i = 0; i < originalDeck.length; i++) {
      if (getCardId(originalDeck[i]!) !== getCardId(shuffledDeck[i]!)) changedCards++
    }

    expect(changedCards).toBeGreaterThan(0)
  })

  test ('Contains unique cards', () =>{
    const uniqueKeysMap = shuffledDeck.map(card => getCardId(card))
    const uniqueKeysSet = new Set (uniqueKeysMap)

    expect (uniqueKeysMap.length).toBe(uniqueKeysSet.size)
  })

  test ('Should contian the same cards', () => {
    const originalCardsMap = originalDeck.map(card => getCardId(card))
    const shuffledCardsMap = shuffledDeck.map(card => getCardId(card))

    expect ( [...originalCardsMap].sort() ).toEqual( [...shuffledCardsMap].sort() )
  })

  test ('shuffledDeck should be balance', () => {
    const hearts = shuffledDeck.filter(card => card.suit === 'hearts')
    const diamonds  = shuffledDeck.filter(card => card.suit === 'diamonds')
    const clubs = shuffledDeck.filter(card => card.suit === 'clubs')
    const spades = shuffledDeck.filter(card => card.suit === 'spades')

    expect( hearts.length ).toBe(13)
    expect( diamonds.length ).toBe(13)
    expect( clubs.length ).toBe(13)
    expect( spades.length ).toBe(13)
  })
})