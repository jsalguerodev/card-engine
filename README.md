# Card Engine

Card Engine is a logic-heavy TypeScript project built to practice unit-test design with Vitest. It models a small custom card game engine with deck creation, shuffling, card dealing, hand scoring, turn management, player finishing, and winner resolution.

The project intentionally avoids UI, databases, HTTP calls, and framework concerns. The focus is domain logic, edge cases, immutable state updates, and testable function design.

## Index

- [Features](#features)
- [Tech stack](#tech-stack)
- [Installation](#installation)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Domain model](#domain-model)
  - [Card](#card)
  - [Player](#player)
  - [Game state](#game-state)
- [Game flow](#game-flow)
  - [Creating a game](#creating-a-game)
  - [Taking a turn](#taking-a-turn)
  - [Finishing a player](#finishing-a-player)
  - [Ending the game](#ending-the-game)
- [Scoring rules](#scoring-rules)
- [Winner resolution](#winner-resolution)
- [Testing](#testing)
- [Example usage](#example-usage)
- [Module overview](#module-overview)
- [License](#license)

## Features

- Creates a standard 52-card deck.
- Shuffles a deck without mutating the original deck.
- Deals cards round-robin to multiple players.
- Draws cards from the deck.
- Supports drawing from the discard pile.
- Supports discarding and replacing cards in a hand.
- Scores hands using custom card-game rules.
- Detects flushes, runs, pairs, three of a kind, and four of a kind.
- Adds Ace bonuses during hand scoring.
- Compares two hands by score.
- Creates full game state with players, hands, deck, target score, rounds, phase, and winner.
- Validates turns based on game phase, current player, and player status.
- Advances turns across players and rounds.
- Skips players who have finished.
- Ends the game when the maximum round is reached or no active players remain.
- Resolves the winner after the game reaches the `finished` phase.
- Includes a Vitest suite for deck, dealer, evaluator, game, player, and state logic.

## Tech stack

- TypeScript
- Node.js
- Vitest
- V8 coverage provider
- tsx

## Installation

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

The repository includes a `pnpm-lock.yaml`, so pnpm is also supported.

## Available scripts

Run the sample app in watch mode:

```bash
npm run dev
```

Build the TypeScript project:

```bash
npm run build
```

Run Vitest in watch mode:

```bash
npm test
```

Run the full test suite once:

```bash
npm run test:run
```

Run the test suite with coverage:

```bash
npm run coverage
```

The same scripts can be run with pnpm:

```bash
pnpm test
pnpm run test:run
pnpm run coverage
```

## Project structure

```txt
src/
  app.ts
  dealer/
    deal-cards.ts
    draw-card.ts
    index.ts
  deck/
    create-deck.ts
    shuffle-deck.ts
    index.ts
  evaluator/
    compare-hands.ts
    get-ace-bonus.ts
    get-base-score.ts
    get-card-score.ts
    get-highest-rank.ts
    get-pair-counts.ts
    get-rank-counts.ts
    has-four-of-kind.ts
    has-one-pair.ts
    has-three-of-kind.ts
    is-flush.ts
    is-run.ts
    score-hand.ts
    index.ts
  game/
    advance-turn.ts
    apply-turn.ts
    can-play.ts
    discard-and-draw.ts
    draw-and-discard.ts
    finish-player.ts
    get-winner.ts
    is-game-over.ts
    is-valid-turn.ts
    index.ts
  player/
    create-player.ts
    index.ts
  state/
    create-game.ts
    index.ts
  types/
    ApplyTurn.type.ts
    Card.type.ts
    DealCards.type.ts
    Deck.type.ts
    GamePhase.type.ts
    GameState.type.ts
    Hand.type.ts
    Player.type.ts
    Rank.type.ts
    Suit.type.ts
    index.ts

tests/
  dealer/
  deck/
  evaluator/
  game/
  player/
  state/
```

## Domain model

### Card

A card has a `suit` and a `rank`.

```ts
type Card = {
  suit: Suit
  rank: Rank
}
```

Supported suits:

```ts
type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
```

Supported ranks:

```ts
type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A'
```

Rank values are defined by `RANKS_VALUES`:

```ts
2  -> 2
3  -> 3
4  -> 4
5  -> 5
6  -> 6
7  -> 7
8  -> 8
9  -> 9
10 -> 10
J  -> 11
Q  -> 12
K  -> 13
A  -> 14
```

### Player

A player has an id, a hand, and a finished status.

```ts
type Player = {
  id: string
  hand: Hand
  isFinished: boolean
}
```

### Game state

The game state stores all information needed to continue or resolve a game.

```ts
type GameState = {
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
```

Supported phases:

```ts
type GamePhase = 'dealing' | 'playing' | 'finished'
```

## Game flow

### Creating a game

A game is created with:

```ts
createGame( playerIds, cardsPerPlayer, rounds )
```

`createGame`:

1. Validates that there are at least two players.
2. Validates that the deck has enough cards for the requested number of players and cards per player.
3. Creates a standard deck.
4. Shuffles the deck.
5. Deals cards round-robin.
6. Creates each player with a starting hand.
7. Sets the first player as the current player.
8. Generates a random target score based on `cardsPerPlayer`.
9. Initializes the game in the `playing` phase.

Initial state includes:

```ts
phase: 'playing'
winner: null
currentRound: 1
discardPile: []
```

### Taking a turn

A turn is applied with:

```ts
applyTurn( state, playerId, options )
```

A player can either finish:

```ts
{
  finish: true
}
```

or draw and discard:

```ts
{
  finish: false,
  drawSource: 'deck' | 'discardPile',
  cardToDiscard: Card
}
```

`applyTurn` validates that:

- the game is in the `playing` phase;
- the player exists;
- it is the player's turn;
- the player has not already finished;
- the selected draw source has cards available.

When drawing from the deck, the engine removes one card from `remainingDeck`.

When drawing from the discard pile, the engine removes one card from `discardPile`.

After drawing, the selected card is discarded from the player's hand and the drawn card replaces it. The discarded card is added to the discard pile. The turn then advances to the next available player.

### Finishing a player

A player can be marked as finished with:

```ts
finishPlayer( state, playerId )
```

This function validates that:

- the player exists;
- it is that player's turn;
- the player has not already finished.

After the player is marked as finished, the turn advances.

### Ending the game

The game can reach the `finished` phase when:

- the maximum round is reached while turns wrap back around; or
- all players have finished.

The game-over check is simple:

```ts
isGameOver( state )
```

It returns `true` when:

```ts
state.phase === 'finished'
```

## Scoring rules

Hands are scored with a custom point system.

| Rule | Points |
| --- | ---: |
| Number cards | Face value |
| Jack | 11 |
| Queen | 12 |
| King | 13 |
| Ace | 14 |
| Flush | +20 |
| Run | +15 |
| One pair | +10 |
| Three of a kind | +25 |
| Four of a kind | +40 |
| Exactly one Ace | +5 |
| Two or more Aces | +15 |

Bonuses can stack.

For example, a hand may receive base card points, flush bonus, run bonus, and Ace bonus together when all conditions apply.

The scoring pipeline is implemented by:

```ts
scoreHand( hand )
```

which combines:

- `getBaseScore`
- `isFlush`
- `isRun`
- `hasOnePair`
- `hasThreeOfKind`
- `hasFourOfKind`
- `getAceBonus`

Two hands can be compared with:

```ts
compareHands( firstHand, secondHand )
```

It returns:

```ts
1   // first hand wins
-1  // second hand wins
0   // tied score
```

## Winner resolution

A winner is resolved with:

```ts
getWinner( state )
```

`getWinner` can only be called when:

```ts
state.phase === 'finished'
```

Otherwise it throws:

```txt
Game is not finished
```

The current winner resolution flow is:

1. Score every player's hand with `scoreHand`.
2. Sort scores from highest to lowest.
3. Check whether the highest score is shared by multiple players.
4. If the highest score is tied, use highest card rank as the tie-breaker.
5. If the highest score is not tied, check whether any players exceeded the target score.
6. If one player exceeded the target score, the next highest scorer is selected.
7. If multiple players exceeded the target score, highest card rank is used as the tie-breaker among those players.
8. If no players exceeded the target score, the highest score wins.
9. If players remain tied after comparing highest card rank, the first player found in player order wins.

The tie-breaker uses:

```ts
getHighestRank( hand )
```

## Testing

The project uses Vitest with globals enabled.

The test suite is organized by module:

```txt
tests/dealer
tests/deck
tests/evaluator
tests/game
tests/player
tests/state
```

The suite includes tests for:

- deck creation;
- deck shuffling;
- card dealing;
- drawing cards;
- base card scoring;
- hand bonus detection;
- hand comparison;
- player creation;
- game creation;
- turn validation;
- turn application;
- round advancement;
- finishing players;
- game-over detection;
- winner resolution;
- thrown errors and invalid inputs.

Run tests once with:

```bash
npm run test:run
```

Run tests with coverage:

```bash
npm run coverage
```

## Example usage

```ts
import { createGame } from './state'
import { applyTurn, getWinner, isGameOver } from './game'

const state = createGame(
  [ 'Player-1', 'Player-2', 'Player-3' ],
  5,
  3
)

const nextState = applyTurn(
  state,
  'Player-1',
  {
    finish: true
  }
)

if ( isGameOver( nextState ) ) {
  const winner = getWinner( nextState )

  console.log( winner.id )
}
```

A hand can be scored directly:

```ts
import { scoreHand } from './evaluator'
import { Hand } from './types'

const hand: Hand = [
  { suit: 'hearts', rank: 10 },
  { suit: 'hearts', rank: 'J' },
  { suit: 'hearts', rank: 'Q' },
  { suit: 'hearts', rank: 'K' },
  { suit: 'hearts', rank: 'A' }
]

const score = scoreHand( hand )

console.log( score )
```

## Module overview

### `src/deck`

Deck utilities.

- `createDeck`: creates a standard 52-card deck.
- `shuffleDeck`: returns a shuffled copy of a deck.

### `src/dealer`

Card dealing and drawing utilities.

- `dealCards`: deals cards round-robin and returns hands plus the remaining deck.
- `drawCard`: draws one card from the deck and returns the card plus the remaining deck.

### `src/evaluator`

Hand-scoring utilities.

- `getCardScore`: converts a card rank into its numeric value.
- `getBaseScore`: sums the values of all cards in a hand.
- `getRankCounts`: counts how many times each rank appears.
- `getPairCounts`: counts rank groups with exactly two cards.
- `hasOnePair`: detects exactly one pair.
- `hasThreeOfKind`: detects three of a kind.
- `hasFourOfKind`: detects four of a kind.
- `isFlush`: detects a five-card hand with one suit.
- `isRun`: detects consecutive ranks.
- `getAceBonus`: calculates the Ace bonus.
- `getHighestRank`: returns the highest-ranked card in a hand.
- `scoreHand`: calculates the full hand score.
- `compareHands`: compares two hands by score.

### `src/game`

Game rules and state transitions.

- `canPlay`: checks whether a card exists in a hand.
- `isValidTurn`: checks whether a player can act in the current state.
- `drawAndDiscard`: replaces a discarded card with a drawn card.
- `discardAndDraw`: discards from a hand and draws from a deck.
- `applyTurn`: applies a full player turn.
- `finishPlayer`: marks a player as finished and advances the turn.
- `advanceTurn`: moves the game to the next active player or finishes the game.
- `isGameOver`: checks whether the phase is `finished`.
- `getWinner`: resolves the winner after the game is finished.

### `src/player`

Player factory.

- `createPlayer`: creates a player with an id, hand, and `isFinished: false`.

### `src/state`

Game-state factory.

- `createGame`: creates a complete initial game state.

### `src/types`

Shared TypeScript types and constants used across the engine.

## License

MIT
