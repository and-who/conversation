import { ConversationOption } from "../TalkSystem/TalkSystem";
import { NPC } from "./NPC";

const reallyOption: ConversationOption = {
  text: ["really..."],
  nextNode: {
    text: ["and all run by me."],
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
          text: ["Ok, ok, but we arre Full!"],
        }
      },
      {
        text: ["Pretty Large"],
        nextNode: {
          text: ["yeah", "infinite"],
          options: [
            reallyOption
          ]
        }
      }
    ]
  }
}

export default owner