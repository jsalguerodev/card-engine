import { DealCardsOptions, DealCardsOutput,  } from '../types'

export const dealCards = (options: DealCardsOptions): DealCardsOutput => {

  const hands : DealCardsOutput['hands'] = []
  const remainingDeck: DealCardsOutput['remainingDeck'] = []


  return {
    hands,
    remainingDeck
  }
}
