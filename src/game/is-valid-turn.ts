import { GameState } from '../types'

export const isValidTurn = (state: GameState, playerId: string): boolean => {
  if (state.phase !== 'playing') {
    return false
  }

  if ( state.currentPlayerId !== playerId ) {
    return false
  }

  if ( state.players.find( player => player.id === playerId )?.isFinished ) {
    return false
  }

  return true
}
