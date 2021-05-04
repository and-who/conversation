import talkSystem from '../TalkSystem/TalkSystem'
import owner from "../NPC/Owner"
import Prompt from 'prompt-sync'

const prompt = Prompt()
export interface GameObject {
  knowsInfinity: boolean;
  hasRoomKey: boolean;
}

const gameObject: GameObject = {
  knowsInfinity: false,
  hasRoomKey: false
}

export const runGame = () => {
  let exit = false
  const npcs = [owner]

  while(!exit){
    let selectedNpcIndex = null;
    console.clear()
    console.log("You are in the Lobby")
    console.log(gameObject)
    console.log("===")
    npcs.forEach((npc, index) => console.log(`${index+1}.) Talk to ${npc.name}`))
    console.log(`0.) Exit Hotel`)
    while(selectedNpcIndex === null) {
      selectedNpcIndex = parseInt(prompt(" -> ")) -1
      selectedNpcIndex = selectedNpcIndex <= npcs.length ? selectedNpcIndex : null
    }
  
    if(selectedNpcIndex < npcs.length && selectedNpcIndex >= 0) {
      console.clear()
      talkSystem(npcs[selectedNpcIndex], gameObject)
    } else {
      exit = true
    }
  }

}

export default runGame