import { Deck } from "./Deck.type"
import { Player } from "./Player.type"
import { GamePhase } from './GamePhase.type'

export type GameState = {
  deck: Deck
  players: Player[]
  currentPlayerId: string
  phase: GamePhase
  winner: string | null
}