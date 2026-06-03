import { drawCard } from "../dealer"
import { Card, Deck, Hand } from "../types"

type DiscardAndDrawOutput = {
  returnHand: Hand
  remainingDeck: Deck
  drawnCard: Card
}

export const discardAndDraw = (hand: Hand, cardToDiscard: Card, deck: Deck) : DiscardAndDrawOutput => {
  if (hand.length === 0) throw new Error('Hand is empty')
  if (deck.length === 0) throw new Error('Deck is empty')

  const index = hand.findIndex(card =>
    card.rank === cardToDiscard.rank &&
    card.suit === cardToDiscard.suit
  )
  if (index === -1) throw new Error('Discarded card not in hand')

  const { card: drawnCard, remainingDeck } = drawCard(deck)

  const returnHand = [...hand]
  returnHand.splice(index, 1, drawnCard)

  return {
    returnHand,
    remainingDeck,
    drawnCard
  }
}