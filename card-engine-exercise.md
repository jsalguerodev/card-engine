# 🃏 CardEngine — Vitest Training Project

A small, logic-heavy TypeScript project designed to practice unit testing with Vitest.
No UI, no database, no poker knowledge required — just pure functions, types, and rules.

---

## 🎯 Goal

Build a card game engine from scratch, writing tests alongside each module.
By the end you will have practiced:

- Writing unit tests for pure functions
- Handling edge cases and invalid inputs
- Using `describe`, `it`, `expect`, `beforeEach`
- Running coverage reports
- Thinking about testability while writing code

---

## 📁 Folder Structure

```
card-engine/
├── src/
│   ├── types.ts          # All shared types — no logic here
│   ├── deck.ts           # createDeck(), shuffle()
│   ├── dealer.ts         # deal()
│   ├── evaluator.ts      # scoreHand(), compareHands()
│   ├── rules.ts          # canPlay(), isValidTurn(), isGameOver()
│   ├── state.ts          # createGame(), applyTurn(), getWinner()
│   └── index.ts          # re-exports everything
│
├── tests/
│   ├── deck.test.ts
│   ├── dealer.test.ts
│   ├── evaluator.test.ts
│   ├── rules.test.ts
│   └── state.test.ts
│
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## ⚙️ Setup

```bash
npm init -y
npm install -D typescript vitest @vitest/coverage-v8
npx tsc --init
```

**`vitest.config.ts`**
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: { provider: 'v8' }
  }
})
```

**`package.json` scripts**
```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run",
  "coverage": "vitest run --coverage"
}
```

---

## 🧩 Types (`src/types.ts`)

Define all shared types here. No logic allowed in this file.

```ts
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A'

export type Card = { suit: Suit; rank: Rank }
export type Deck = Card[]
export type Hand = Card[]

export type Player = {
  id: string
  hand: Hand
}

export type GamePhase = 'dealing' | 'playing' | 'finished'

export type GameState = {
  deck: Deck
  players: Player[]
  currentPlayerId: string
  phase: GamePhase
  winner: string | null
}
```

---

## 📦 Modules — What to Build

### 1. `deck.ts`

**Functions to implement:**

```ts
createDeck(): Deck
// Returns a full 52-card deck (13 ranks × 4 suits), unshuffled.

shuffle(deck: Deck): Deck
// Returns a new shuffled deck. Must NOT mutate the original.
```

**Rules:**
- A standard deck has exactly 52 cards
- Each card (suit + rank combination) appears exactly once
- `shuffle` must return a new array, not modify the input

---

### 2. `dealer.ts`

**Functions to implement:**

```ts
deal(deck: Deck, players: Player[], cardsPerPlayer: number): { players: Player[]; remainingDeck: Deck }
// Deals `cardsPerPlayer` cards to each player from the top of the deck.
// Returns updated players (with cards in hand) and the remaining deck.
```

**Rules:**
- Cards are dealt one at a time, round-robin (player 1, player 2, ... repeat)
- If there are not enough cards in the deck, throw an error
- Original deck and players must not be mutated

---

### 3. `evaluator.ts` ⭐ (Most logic-heavy)

This module scores a hand of cards using a custom point system. No poker knowledge needed.

**Scoring rules (applied to a 5-card hand):**

| Rule | Points |
|------|--------|
| Each card contributes its numeric rank value | face value |
| Jack = 11, Queen = 12, King = 13, Ace = 14 (unless stated otherwise) | — |
| All 5 cards are the same suit (**flush**) | +20 bonus |
| Cards form a sequence of consecutive values (**run**) | +15 bonus |
| One pair (two cards with the same rank) | +10 |
| Three of a kind | +25 |
| Four of a kind | +40 |
| Exactly one Ace in hand | +5 bonus |
| Two or more Aces in hand | +15 bonus (replaces the +5) |

> **Note:** Bonuses can stack. A flush + run = +35 extra points on top of the card values.

**Functions to implement:**

```ts
scoreHand(hand: Hand): number
// Returns the total score for a hand based on the rules above.

compareHands(a: Hand, b: Hand): 1 | -1 | 0
// Returns 1 if a wins, -1 if b wins, 0 if tied.
```

---

### 4. `rules.ts`

**Functions to implement:**

```ts
canPlay(player: Player, card: Card): boolean
// Returns true if the player actually has that card in their hand.

isValidTurn(state: GameState, playerId: string): boolean
// Returns true if it is currently that player's turn.

isGameOver(state: GameState): boolean
// Returns true if the game is in the 'finished' phase.
```

---

### 5. `state.ts`

**Functions to implement:**

```ts
createGame(playerIds: string[], cardsPerPlayer: number): GameState
// Creates a new game: builds a deck, shuffles it, deals cards to players.
// The first player in the array goes first.

applyTurn(state: GameState, playerId: string, card: Card): GameState
// Applies a player's turn: removes the card from their hand, advances to the next player.
// Throws if it's not that player's turn, or they don't have the card.
// Returns a NEW state object (no mutation).

getWinner(state: GameState): Player | null
// Returns the player with the highest-scoring hand, or null if game is not finished.
```

---

## 🧪 Test Requirements

For each module, you must write tests that cover:

### `deck.test.ts`
- `createDeck` returns exactly 52 cards
- `createDeck` contains no duplicate cards
- `createDeck` returns cards in a predictable unshuffled order
- `shuffle` returns 52 cards
- `shuffle` does not mutate the original deck
- `shuffle` produces a different order than the input (run a few times)

### `dealer.test.ts`
- Cards are distributed correctly across players
- Round-robin order is respected
- Remaining deck is correctly reduced
- Throws when not enough cards
- Original deck/players are not mutated

### `evaluator.test.ts`
- Face card ranks score correctly (J=11, Q=12, K=13, A=14)
- Flush bonus is applied when all suits match
- Run bonus is applied for consecutive values
- Pairs are detected and scored correctly
- Three of a kind scores correctly
- Four of a kind scores correctly
- Ace bonuses: one Ace (+5), two Aces (+15)
- Multiple bonuses stack correctly
- `compareHands` returns the correct winner
- `compareHands` returns 0 on a tie

### `rules.test.ts`
- `canPlay` returns true when player has the card
- `canPlay` returns false when player does not have the card
- `isValidTurn` returns true for the current player
- `isValidTurn` returns false for other players
- `isGameOver` returns true only when phase is `'finished'`

### `state.test.ts`
- `createGame` deals the correct number of cards to each player
- `createGame` sets the correct starting player
- `applyTurn` removes the played card from the player's hand
- `applyTurn` advances to the next player
- `applyTurn` throws when it's not that player's turn
- `applyTurn` throws when the player doesn't have the card
- `applyTurn` does not mutate the original state
- `getWinner` returns null when game is not finished
- `getWinner` returns the player with the highest score

---

## 🪜 Suggested Build Order

Build and test one module at a time before moving on:

```
1. types.ts      → no tests needed, just define the types
2. deck.ts       → deck.test.ts
3. dealer.ts     → dealer.test.ts
4. evaluator.ts  → evaluator.test.ts  ← spend the most time here
5. rules.ts      → rules.test.ts
6. state.ts      → state.test.ts
```

---

## 💡 Vitest Concepts You'll Practice

| Concept | Where you'll use it |
|---------|-------------------|
| `describe` / `it` / `expect` | Every test file |
| `toBe`, `toEqual`, `toThrow` | Throughout |
| `beforeEach` | `state.test.ts` — reset game state |
| Edge cases | `evaluator`, `dealer` |
| Immutability checks | `deck`, `dealer`, `state` |
| Coverage reports | Run `npm run coverage` at the end |

---

## ✅ Done When...

- All tests pass with `npm run test:run`
- Coverage is above **85%** across all files
- No module mutates its inputs
- `evaluator.ts` handles all bonus combinations correctly
