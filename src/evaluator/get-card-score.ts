import { Card } from "../types"

export const getCardScore = (card : Card) : number => {
  const { rank } = card

  const faceCardsValues = {
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
  }

  if ( typeof rank === 'number' ) {
    return rank
  } else if( typeof rank === 'string' ){
    return faceCardsValues[ rank ]
  }

  return 0
}
