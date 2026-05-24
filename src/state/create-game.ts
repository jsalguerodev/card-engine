import { GameState } from "../types";
import { createDeck, shuffleDeck } from '../deck'
import { dealCards } from '../dealer'
import { createPlayer } from '../player'

export const createGame = ( playerIds: string[], cardsPerPlayer: number, rounds: number) : GameState => {
  if (playerIds.length < 2) {
    throw new Error ('Game requires at least 2 players')
  }

  const maxPlayers = Math.floor( 52 / cardsPerPlayer)
  if (playerIds.length > maxPlayers ) {
    throw new Error (`Cannot create game: maximum ${maxPlayers} players allowed for ${cardsPerPlayer} cards per player`)
  }

  const deck = createDeck ()
  const shuffledDeck = shuffleDeck( deck )

  const dealCardsOptions = {
    deck: shuffledDeck,
    cardsPerPlayer: cardsPerPlayer,
    numberOfPlayers: playerIds.length
  }

  const {hands, remainingDeck} = dealCards( dealCardsOptions )

  const players = playerIds.map( (player, index) => {
    const options = {
      id: player,
      hand: hands[index]!
    }

    return createPlayer( options )
  })

  const currentPlayerId = players[0]!.id
  const minScore = 14 * (cardsPerPlayer)
  const maxScore = minScore + (cardsPerPlayer >= 4 ? 35 : 75)
  const targetScore = Math.floor( (Math.random()) * (maxScore - minScore + 1) ) + minScore

  return {
    players,
    currentPlayerId,
    remainingDeck: remainingDeck,
    discardPile: [],
    targetScore,
    maxRounds: rounds,
    currentRound: 1,
    phase: "playing",
    winner: null
  }
}