import { Deck } from "./Deck.type"
import { Card } from "./Card.type"
import { Player } from "./Player.type"
import { GamePhase } from './GamePhase.type'

export type GameState = {
  players: Player[]
  currentPlayerId: string
  remainingDeck: Deck
  discardPile: Card[]
  targetScore: number
  maxRounds: number
  currentRound: number
  phase: GamePhase
  winner: string | null
}