import { getRankCounts } from "./get-rank-counts"
import { Hand } from "../types"

export const hasFourOfKind = (hand: Hand): boolean => {
  const rankCounts = getRankCounts(hand)

  return Object.values(rankCounts).filter(number => number === 4).length === 1
}