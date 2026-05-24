import { GameState } from "../types";
import { createDeck, shuffleDeck } from '../deck'
import { dealCards } from '../dealer'
import { createPlayer } from '../player'

export const createGame = ( playerIds: string[], cardsPerPlayer: number) : GameState => {
  if (playerIds.length < 2) {
    throw new Error ('Game requires at least 2 players')
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

  return {
    deck: remainingDeck,
    players,
    currentPlayerId,
    phase: "playing",
    winner: null
  }
}