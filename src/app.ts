import { createGame } from './state'
import { applyTurn, getWinner } from './game'
import { scoreHand } from './evaluator'
import { Card, GameState, Player } from './types'

const getCurrentPlayer = ( state: GameState ): Player => {
  const player = state.players.find(
    player => player.id === state.currentPlayerId
  )

  if ( player === undefined ) {
    throw new Error( `Current player ${state.currentPlayerId} not found` )
  }

  return player
}

const getFirstCard = ( player: Player ): Card => {
  const card = player.hand[0]

  if ( card === undefined ) {
    throw new Error( `${player.id} has no cards in hand` )
  }

  return card
}

const printGameSummary = ( state: GameState ): void => {
  console.log( '--- Game Summary ---' )
  console.log( 'Phase:', state.phase )
  console.log( 'Target score:', state.targetScore )
  console.log( 'Current round:', state.currentRound )
  console.log( 'Current player:', state.currentPlayerId )
  console.log( 'Remaining deck:', state.remainingDeck.length )
  console.log( 'Discard pile:', state.discardPile.length )

  console.log( '\nPlayers:' )

  state.players.forEach( player => {
    console.log( {
      id: player.id,
      isFinished: player.isFinished,
      hand: player.hand,
      score: scoreHand( player.hand )
    } )
  } )
}

const main = (): void => {
  let state = createGame(
    [
      'Player-1',
      'Player-2',
      'Player-3'
    ],
    5,
    1
  )

  printGameSummary( state )

  while ( state.phase === 'playing' ) {
    const currentPlayer = getCurrentPlayer( state )
    const cardToDiscard = getFirstCard( currentPlayer )

    state = applyTurn(
      state,
      currentPlayer.id,
      {
        finish: false,
        drawSource: 'deck',
        cardToDiscard
      }
    )

    console.log( `\n${currentPlayer.id} played a turn.` )
    printGameSummary( state )
  }

  const winner = getWinner( state )

  console.log( '\n--- Winner ---' )
  console.log( winner )
}

main()