import { GameState, Player } from '../types'
import { scoreHand, getHighestRank } from '../evaluator'

type PlayerWithScore = {
  playerId: string
  score: number
}

export const getWinner = ( state: GameState ): Player => {
  if ( state.phase !== 'finished' ) {
    throw new Error( 'Game is not finished' )
  }

  const { players } = structuredClone( state )

  if ( players.length === 0 ) {
    throw new Error( 'Game has no players' )
  }

  const scores = state.players
    .map( player => ({
      playerId: player.id,
      score: scoreHand( player.hand )
    }) )
    .sort( ( a, b ) => b.score - a.score )

  const duplicatedScorePlayers = getTopScoringTiedPlayers( scores )

  if ( duplicatedScorePlayers.length === 0 ) {
    const overScoredPlayers = getOverScoredPlayers( scores, state.targetScore )

    if ( overScoredPlayers.length === 1 ) {
      return getPlayerById( players, scores[1]!.playerId )
    }

    if ( overScoredPlayers.length > 1 ) {
      const winnerId = getTieBreakerWinnerId( overScoredPlayers, players )

      return getPlayerById( players, winnerId )
    }

    const highestScoredPlayer = scores[0]

    if ( highestScoredPlayer === undefined ) {
      throw new Error( 'Game has no scores' )
    }

    return getPlayerById( players, highestScoredPlayer.playerId )
  }

  const winnerId = getTieBreakerWinnerId( duplicatedScorePlayers, players )

  return getPlayerById( players, winnerId )
}

const getTopScoringTiedPlayers = ( players: PlayerWithScore[] ): PlayerWithScore[] => {
  const highestScore = players[0]?.score

  if ( highestScore === undefined ) {
    return []
  }

  const highestScorePlayers = players.filter(
    player => player.score === highestScore
  )

  return highestScorePlayers.length > 1
    ? highestScorePlayers
    : []
}

const getOverScoredPlayers = ( players: PlayerWithScore[], targetScore: number): PlayerWithScore[] => {
  return players.filter( player => player.score > targetScore )
}

const getTieBreakerWinnerId = ( candidateScores: PlayerWithScore[], players: Player[] ): string => {
  const candidateIds = new Set(
    candidateScores.map( player => player.playerId )
  )

  const candidates = players.filter(
    player => candidateIds.has( player.id )
  )

  const firstCandidate = candidates[0]

  if ( firstCandidate === undefined ) {
    throw new Error( 'No candidates found for tie breaker' )
  }

  return candidates
    .slice( 1 )
    .reduce( ( winner, player ) => {
      const winnerRank = getHighestRank( winner.hand )
      const playerRank = getHighestRank( player.hand )

      return playerRank > winnerRank
        ? player
        : winner
    }, firstCandidate )
    .id
}

const getPlayerById = ( players: Player[], playerId: string ): Player => {
  const player = players.find(
    player => player.id === playerId
  )

  if ( player === undefined ) {
    throw new Error( `Player ${playerId} not found` )
  }

  return player
}