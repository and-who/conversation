import talkSystem from '../TalkSystem/TalkSystem'
import owner from "../NPC/Owner"

export interface GameObject {
  knowsInfinity: boolean;
}

const gameObject: GameObject = {
  knowsInfinity: false
}

export const runGame = () => {
 talkSystem(owner, gameObject)
}

export default runGame