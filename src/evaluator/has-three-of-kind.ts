import { getRankCounts } from "./get-rank-counts"
import { Hand } from "../types"

export const hasThreeOfKind = (hand: Hand): boolean => {
  const rankCounts = getRankCounts(hand)

  return Object.values(rankCounts).filter(number => number === 3).length === 1
}