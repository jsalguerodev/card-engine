import { Hand } from './Hand.type'

export type Player = {
  id : string,
  hand : Hand,
  isFinished: boolean
}