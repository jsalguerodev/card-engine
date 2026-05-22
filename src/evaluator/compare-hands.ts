import { scoreHand } from './score-hand'
import { Hand } from '../types'

type output = 1 | -1 | 0

export const compareHands = (firstHand: Hand, secondHand: Hand) : output => {
  const firstHandScore = scoreHand( firstHand )
  const secondHandScore = scoreHand( secondHand )

  if ( firstHandScore > secondHandScore){
    return 1
  } else if ( firstHandScore < secondHandScore ) {
    return -1
  } else {
    return 0
  }
}