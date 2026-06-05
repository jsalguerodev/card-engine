import { Hand, Card } from "../types"

export const drawAndDiscard = ( hand: Hand, drawnCard: Card, cardToDiscard: Card ) : Hand => {
  if (hand.length === 0) throw new Error ('Hand is empty')

  const cardToDiscardIndex = hand.findIndex(
    card => card.rank === cardToDiscard.rank && card.suit === cardToDiscard.suit )
  if  (cardToDiscardIndex === -1 ) throw new Error ('Card to discard is not in hand')

  const returnHand = [...hand]
  returnHand.splice(cardToDiscardIndex, 1, drawnCard)

  return returnHand
}