import { GameState } from "../types"
import { advanceTurn } from "./advance-turn"

export const finishPlayer = (state: GameState, playerId: string): GameState => {
  if (!state.players.find(player => player.id === playerId))
    throw new Error(`${playerId} does not exist in game`)

  if (state.currentPlayerId !== playerId)
    throw new Error(`it is not ${playerId}'s turn. It is ${state.currentPlayerId}'s turn`)

  if (state.players.find(player => player.id === playerId)!.isFinished)
    throw new Error(`${playerId} has already finished`)

  const stateCopy = structuredClone(state)
  stateCopy.players.find(player => player.id === playerId)!.isFinished = true

  return advanceTurn(stateCopy)
}