import { GameState } from "../types"

export const isGameOver = (state: GameState): boolean => {
  return state.phase === 'finished'
}