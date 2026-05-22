import { getRankCounts } from "./get-rank-counts"
import { Hand } from "../types"

export const hasOnePair = (hand: Hand): boolean => {
  const rankCounts = getRankCounts(hand)

  return Object.values(rankCounts).filter(number => number === 2).length === 1
}