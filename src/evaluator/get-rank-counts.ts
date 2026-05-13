import { Hand, Rank } from "../types"

export const getRankCounts = (hand: Hand): Partial< Record<Rank, number> > => {
  const rankCounts = hand.reduce( (acc, card) => {
    acc[card.rank] = ( acc[card.rank] || 0) + 1
    return acc
  }, {} as Partial<Record< Rank, number >>

  )

  return rankCounts
}