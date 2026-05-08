import { Hand, Suit } from "../types"

export const isFlush = (hand: Hand) : boolean => {

  const suits: Partial< Record <Suit,number> > = hand.reduce(
    (acc, card) => {
      acc[card.suit] = (acc[card.suit] || 0) + 1;
      return acc;
    },
    {} as Partial<Record<Suit, number>>
  )

  const handIsFlush = Object.keys(suits).length === 1 && Object.values(suits)[0] === 5

  return handIsFlush
}