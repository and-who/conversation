import Prompt from 'prompt-sync'
import { GameObject } from '../Game/Game';
import { NPC } from '../NPC/NPC';

const prompt = Prompt()

export interface ConversationOption {
  text: string[];
  used?: boolean;
  nextNode?: ConversationNode
}

export interface ConversationNode {
  text: string[];
  options?: ConversationOption[]
  action?: (gameObject: GameObject) => GameObject
}

export const talk = (conversationNode: ConversationNode, npc: NPC, gameObject: GameObject) => {
  
  conversationNode.text.forEach(textFragment => console.log(`${npc.name}: ${textFragment}`))
  if(conversationNode.options && conversationNode.options.length > 0){
    console.log("---");
    let selectedOption = null;
  
    conversationNode.options.forEach((conversationOption, index) => {
      console.log(`${index+1}): ${conversationOption.text}`)
    });
    while(!selectedOption) {
      selectedOption = parseInt(prompt(" -> "))
      selectedOption = selectedOption <= conversationNode.options.length ? selectedOption : null
    }

    console.log(`Player: ${conversationNode.options[selectedOption-1].text}`)

    const nextNode = conversationNode.options[selectedOption-1].nextNode
    if(nextNode){
      talk(nextNode, npc, gameObject)
    }
  }
}

export const talkSystem = (npc: NPC, gameObject: GameObject) => {
  console.clear()
  talk(npc.conversation, npc, gameObject)
}

export default talkSystem