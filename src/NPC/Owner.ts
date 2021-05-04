import { GameObject } from "../Game/Game";
import { ConversationOption } from "../TalkSystem/TalkSystem";
import { NPC } from "./NPC";

const reallyOption: ConversationOption = {
  text: ["really..."],
  nextNode: {
    text: ["...and all run by me"],
  }
}

export const owner:NPC = {
  name: "Owner",
  conversation: {
    text: ["Hello this is..."],
    options: [
      {
        text: ["No Time!", "I need a Room!"],
        nextNode: {
          text: ["Slow down", "There is no Room available."],
        },
      },
      {
        text: ["Can I have a Room, please?"],
        checkPossible: (gameObject) => gameObject.knowsInfinity,
        nextNode: {
          text: ["It seems you are a nice Guy", "Here is your Room Key"],
          action: (gameObject: GameObject) => {
            gameObject.hasRoomKey=true
            return gameObject
          },
        },
      },
      {
        text: ["Pretty Large Hotel"],
        nextNode: {
          text: ["yeah", "infinite"],
          action: (gameObject: GameObject) => {
            gameObject.knowsInfinity=true
            return gameObject
          },
          options: [
            reallyOption
          ]
        }
      }
    ]
  }
}

export default owner