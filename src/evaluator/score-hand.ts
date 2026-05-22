import { getBaseScore, isFlush, isRun, hasOnePair, hasThreeOfKind, hasFourOfKind, getAceBonus } from './index'
import { Hand } from "../types"

export const scoreHand = (hand: Hand): number => {

  const baseScore = getBaseScore( hand )
  const flushBonus = ( isFlush( hand ) ) ? 20 : 0
  const runBonus = ( isRun( hand ) ) ? 15 : 0
  const onePairBonus = ( hasOnePair( hand ) ) ? 10 : 0
  const threeKindBonus = ( hasThreeOfKind ( hand) ) ? 25 : 0
  const fourKindBonus = ( hasFourOfKind ( hand) ) ? 40 : 0
  const aceBonus = getAceBonus( hand )
  const handScore = baseScore + flushBonus + runBonus + onePairBonus + threeKindBonus + fourKindBonus + aceBonus

  return handScore
}
