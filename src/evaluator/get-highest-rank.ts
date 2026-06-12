import { Hand, Card } from "../types"
import { RANKS_VALUES} from '../types'

export const getHighestRank = (hand: Hand): Card => {
  if (hand.length === 0) throw new Error('Hand is empty')

  const workingHand = structuredClone(hand)

  workingHand.sort((a, b) => RANKS_VALUES[a.rank] - RANKS_VALUES[b.rank])

  return workingHand[workingHand.length - 1]!
}