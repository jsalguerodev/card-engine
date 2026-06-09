import { GameState, ApplyTurnOptions, Card, Deck } from "../types"
import { finishPlayer, drawAndDiscard, advanceTurn } from "./"
import { drawCard } from "../dealer"

export const applyTurn = ( state: GameState, playerId: string, options : ApplyTurnOptions): GameState => {
  if (state.phase !== 'playing')
    throw new Error('Game is not in playing phase')

  const player = state.players.find( player => player.id === playerId )
  if ( !player )
    throw new Error(`${playerId} does not exist in the game`)

  if ( state.currentPlayerId !== playerId )
    throw new Error(`it is not ${playerId}\'s turn. It is ${state.currentPlayerId}\'s turn`)

  if ( player.isFinished )
    throw new Error(`${playerId} has already finished`)

  if ( !options.finish ) {
    if(options.drawSource === 'discardPile' && state.discardPile.length === 0) {
      throw new Error(`Discard pile is empty. Cannot draw from discard pile`)
    } else if (options.drawSource === 'deck' && state.remainingDeck.length === 0) {
      throw new Error(`Deck is empty. Cannot draw from deck`)
    }
  }

  let returnState = structuredClone(state)

  if (options.finish) {
    return finishPlayer( returnState, playerId)
  }

  const playerIndex = returnState.players.findIndex( player => player.id === playerId)
  const currentPlayer =  returnState.players[playerIndex]

  const drawnCard =
    options.drawSource === 'deck'
      ? (() => {
          const result = drawCard(returnState.remainingDeck)
          returnState.remainingDeck = result.remainingDeck

          return result.card
        })()
      : (() => {
          const discardPile = [...returnState.discardPile]

          const card = discardPile.pop()!

          returnState.discardPile = discardPile

          return card
        })()

  const modifiedHand = drawAndDiscard( currentPlayer!.hand, drawnCard, options.cardToDiscard)
  returnState.players[playerIndex] = {...currentPlayer!, hand: modifiedHand}

  returnState.discardPile.push(options.cardToDiscard)

  return advanceTurn( returnState )
}
