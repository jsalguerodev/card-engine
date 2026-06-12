import { isGameOver } from '../../src/game'
import { GameState } from '../../src/types'

describe('isGameOver', () => {
  let gameState: GameState

  beforeEach( () => {
    gameState = {
      players: [],
      currentPlayerId: '',
      remainingDeck: [],
      discardPile: [],
      targetScore: 0,
      maxRounds: 0,
      currentRound: 0,
      phase: 'playing',
      winner: ''
    }
  })

  test('Should return true state is \'finished\'', () => {
    gameState.phase = 'finished'

    const isGameOverResult = isGameOver(gameState)

    expect(isGameOverResult).toBe(true)
  })

  test('Should return false state is \'playing\'', () => {
    const isGameOverResult = isGameOver(gameState)

    expect(isGameOverResult).toBe(false)
  })

  test('Should return false state is \'dealing\'', () => {
    gameState.phase = 'dealing'

    const isGameOverResult = isGameOver(gameState)

    expect(isGameOverResult).toBe(false)
  })
})
