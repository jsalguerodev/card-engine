import { Deck } from "./Deck.type"
import { Hand } from "./Hand.type"

export type DealCardsOptions = {
  deck: Deck;
  numberOfPlayers: number;
  cardsPerPlayer: number
}

export type DealCardsOutput = {
  hands: Hand[];
  remainingDeck: Deck;
}
