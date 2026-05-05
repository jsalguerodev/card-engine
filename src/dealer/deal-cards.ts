import { DealCardsOptions, DealCardsOutput } from '../types'

export const dealCards = (options: DealCardsOptions): DealCardsOutput => {
  const { deck, numberOfPlayers, cardsPerPlayer } = options

  if (deck.length < numberOfPlayers * cardsPerPlayer) {
    throw new Error('Not enough cards in the deck')
  }

  const workingDeck = [...deck]
  const hands: DealCardsOutput['hands'] = Array.from({ length: numberOfPlayers }, () => [])

  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numberOfPlayers; j++) {
      const hand = hands[j]
      if (!hand) throw new Error('Invalid hand index')

      const card = workingDeck.pop()
      if (!card) throw new Error('Unexpected empty deck')

      hand.push(card)
    }
  }

  return {
    hands,
    remainingDeck: workingDeck
  }
}