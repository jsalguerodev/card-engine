import { Deck, SUITS, RANKS } from "../types"

export const createDeck = (): Deck => {
  const deck : Deck = []

  SUITS.forEach( suit => {
    RANKS.forEach( rank => {
      deck.push({ suit, rank })
    })
  })

  return deck
}