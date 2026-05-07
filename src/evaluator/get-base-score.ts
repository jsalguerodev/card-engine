import { Hand } from "../types"
import { getCardScore } from "./get-card-score"

export const getBaseScore = (hand: Hand): number => {

  let baseScore = 0

  hand.forEach( card => {
    baseScore += getCardScore(card)
  })

  return baseScore
}