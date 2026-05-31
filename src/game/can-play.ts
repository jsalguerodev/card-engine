import { Hand, Card } from "../types"

export const canPlay = (hand: Hand, card: Card): boolean => {
  return hand.some(cardInHand => cardInHand.rank === card.rank && cardInHand.suit === card.suit)
}