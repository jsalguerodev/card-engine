import { createDeck } from "../../src/deck/create-deck.js"
import { Deck } from "../../src/types/Deck.type.js"
describe ('CreateDeck', () => {

  let deck: Deck

  beforeEach(() =>{
    deck = createDeck()
    }
  )

  test ('Should return an array', () => {
    expect(Array.isArray(deck)).toBe(true)
  })

  test ('Should return 52 cards', () => {
    expect(deck.length).toBe(52)
  })

  test ('First card should be hearts 2', () => {
    expect(deck[0]).toEqual({ suit: 'hearts', rank: 2 })
  })

  test ('Last card should be spades A', () => {
    expect(deck[51]).toEqual({ suit: 'spades', rank: 'A' })
  })

  test ('Contains unique cards', () =>{
    const uniqueKeysMap = deck.map(card => card.suit + '-' + card.rank)
    const uniqueKeysSet = new Set (uniqueKeysMap)

    expect (uniqueKeysMap.length).toBe(uniqueKeysSet.size)
  })

  test ('Deck should be balance', () => {
    const hearts = deck.filter(card => card.suit === 'hearts')
    const diamonds  = deck.filter(card => card.suit === 'diamonds')
    const clubs = deck.filter(card => card.suit === 'clubs')
    const spades = deck.filter(card => card.suit === 'spades')

    expect( hearts.length ).toBe(13)
    expect( diamonds.length ).toBe(13)
    expect( clubs.length ).toBe(13)
    expect( spades.length ).toBe(13)
  })
})