import Prompt from 'prompt-sync'
import { GameObject } from '../Game/Game';
import { NPC } from '../NPC/NPC';

const prompt = Prompt()

export interface ConversationOption {
  text: string[];
  used?: boolean;
  checkPossible?: (gameObject: GameObject) => boolean
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
    let selectedOptionIndex = null;
  
    const onlyPossibleOptions = conversationNode.options.filter(conversationOption => conversationOption.checkPossible ? conversationOption.checkPossible(gameObject) : true)
    
    onlyPossibleOptions.forEach((conversationOption, index) => {
      console.log(`${index+1}.) ${conversationOption.text}`)
    });
    console.log("0.) Leave");

    while(selectedOptionIndex === null) {
      selectedOptionIndex = parseInt(prompt(" -> ")) - 1
      selectedOptionIndex = selectedOptionIndex <= onlyPossibleOptions.length ? selectedOptionIndex : null
    }

    if(selectedOptionIndex >= 0 && selectedOptionIndex < onlyPossibleOptions.length){
      console.log(`Player: ${onlyPossibleOptions[selectedOptionIndex].text}`)

      const nextNode = onlyPossibleOptions[selectedOptionIndex]?.nextNode
      if(nextNode){
        if(nextNode.action) {
          nextNode.action(gameObject)
        }
        talk(nextNode, npc, gameObject)
      } else {
        console.log("0.) Leave");
        while(parseInt(prompt(" -> ")) !== 0){
          console.log("Player: Bye");
        }
      }
    }
  } else {
    console.log("0.) Leave");
    while(parseInt(prompt(" -> ")) !== 0){
      console.log("Player: Bye");
    }
  }
}

export const talkSystem = (npc: NPC, gameObject: GameObject) => {
  talk(npc.conversation, npc, gameObject)
}

export default talkSystem