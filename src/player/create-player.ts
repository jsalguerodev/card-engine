import { Player, Hand } from '../types'

type CreatePlayerOptions = {
  id: string,
  hand: Hand
}

export const createPlayer = ( options: CreatePlayerOptions ) : Player => {
  const {id, hand: [...hand] } = options

  return {
    id: id,
    hand: hand
  }
}