import { Card, Hand } from '../../src/types'
import { drawAndDiscard } from "../../src/game"

describe ('drawAndDiscard', () => {
  let hand: Hand
  let drawnCard: Card
  let cardToDiscard: Card

  beforeEach(() => {
    hand = [
      {suit: 'hearts', rank: 2},
      {suit: 'clubs', rank: 4},
      {suit: 'diamonds', rank: 6},
      {suit: 'spades', rank: 'J'},
      {suit: 'hearts', rank: 9}
    ]

    drawnCard = { suit: 'clubs', rank: 2 }
    cardToDiscard = { suit: 'hearts', rank: 9 }
  })

  test('Should maintain hand size', ()=>{
    const newHand = drawAndDiscard( hand, drawnCard, cardToDiscard )

    expect( hand.length ).toEqual( newHand.length )
  })

  test('Should discard the right card', () => {
    const newHand = drawAndDiscard( hand, drawnCard, cardToDiscard )

    expect( newHand ).not.toContainEqual( cardToDiscard )
  })

  test('Should add the right card', () => {
    const newHand = drawAndDiscard( hand, drawnCard, cardToDiscard )

    expect( newHand ).toContainEqual( drawnCard )
  })

  test('Should return a new hand reference', () => {
    const newHand = drawAndDiscard( hand, drawnCard, cardToDiscard )

    expect( newHand ).not.toBe( hand )
  })

  test('Should not modify original hand', () => {
    const snapshot = [...hand]

    drawAndDiscard( hand, drawnCard, cardToDiscard )

    expect( hand ).toEqual( snapshot )
  })

  test('Should preserve the position of the discarded card', () => {
    const newHand = drawAndDiscard( hand, drawnCard, cardToDiscard )

    const discardIndex = hand.findIndex( card => card.rank === cardToDiscard.rank && card.suit === cardToDiscard.suit )
    const drawIndex = newHand.findIndex( card => card.rank === drawnCard.rank && card.suit === drawnCard.suit )

    expect( discardIndex ).toEqual( drawIndex )
  })

  test('Should throw if card to discard is not in hand', () => {
    cardToDiscard = { suit: 'diamonds', rank: 10 }

    expect( () => drawAndDiscard( hand, drawnCard, cardToDiscard ) )
      .toThrow('Card to discard is not in hand')
  })

  test('Should throw if hand is empty', () => {

    expect( () => drawAndDiscard( [] as Hand, drawnCard, cardToDiscard ) )
      .toThrow('Hand is empty')
  })
})