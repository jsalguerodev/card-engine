import { Hand, RANKS_VALUES } from "../types";

export const isRun = (hand: Hand ) : boolean => {
  const ranks = hand.map(card => card.rank)

  ranks.sort( (a, b) => {
    return RANKS_VALUES[a] - RANKS_VALUES[b];
  })

  return ranks.every( (element, index, array) => {
    const previous = array[index - 1]
    if (!previous) return true

    return RANKS_VALUES[element] - RANKS_VALUES[previous] === 1
  })
}