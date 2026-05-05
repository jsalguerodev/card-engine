import { Card, Deck } from "../types"

type DrawCardOutput = {
  card : Card
  remainingDeck : Deck
}

export const drawCard = ( deck : Deck ) : DrawCardOutput => {

  const workingDeck = [...deck]

  const card = workingDeck.pop()
  if ( !card ) throw new Error('Deck is empty')

  return {
    card,
    remainingDeck: workingDeck
  }
}