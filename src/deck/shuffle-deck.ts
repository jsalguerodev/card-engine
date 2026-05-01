import { Deck } from '../types'


export const shuffleDeck = (deck: Deck): Deck => {
  const shuffledDeck = [...deck]

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = shuffledDeck[i]!
    shuffledDeck[i] = shuffledDeck[j]!
    shuffledDeck[j] = temp
  }

  return shuffledDeck
}