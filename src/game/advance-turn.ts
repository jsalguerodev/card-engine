import { GameState } from '../types'

export const advanceTurn = (state: GameState): GameState => {
  const returnState = structuredClone(state)

  if (returnState.phase !== 'playing') {
    throw new Error('The game phase is not valid. Please include a playing game')
  }

  const {
    players,
    currentPlayerId,
    currentRound,
    maxRounds
  } = returnState

  const currentPlayerIndex = players.findIndex(player => player.id === currentPlayerId)
  if (currentPlayerIndex === -1) {
    throw new Error('Current player not found')
  }

  let wrapped = false

  for (let offset = 1; offset <= players.length; offset++) {
    const nextPlayerIndex = (currentPlayerIndex + offset) % players.length

    wrapped = nextPlayerIndex <= currentPlayerIndex

    const nextPlayer = players[nextPlayerIndex]!

    if (nextPlayer.isFinished) continue

    returnState.currentPlayerId = nextPlayer.id

    if (wrapped) {
      if (currentRound === maxRounds) {
        returnState.phase = 'finished'
      } else {
        returnState.currentRound += 1
      }
    }

    return returnState
  }

  returnState.phase = 'finished'
  return returnState
}