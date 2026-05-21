import { Hand } from '../types'

export const getAceBonus = ( hand: Hand ): number => {

  const aceCount = hand.filter( card => card.rank === 'A').length
  let bonus = 0

  if ( aceCount === 1) {
    bonus = 5
  } else if ( aceCount >= 2) {
    bonus = 15
  }

  return bonus
}