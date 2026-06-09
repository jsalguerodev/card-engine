import { Card } from "./Card.type"

export type ApplyTurnOptions =
  | { finish: true }
  | {
      finish: false
      drawSource: 'deck' | 'discardPile'
      cardToDiscard: Card
    }