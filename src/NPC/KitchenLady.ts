import { GameObject } from "../Game/Game";
import { NPC } from "./NPC";

export const kitchenLady:NPC = {
  name: "Kitchen Lady",
  conversation: {
    text: ["Oh Hello Sir.", "How can I help you?"],
    options: [
      {
        text: ["I need Snacks!"],
        checkPossible: (gameObject)  => gameObject.inventory.includes("roomkey"),
        nextNode: {
          text: ["Of course", "Here you go."],
          action: (gameObject: GameObject) => {
            gameObject.inventory.push("Sandwich")
            return gameObject
          },
        },
      },
      {
        text: ["I need Snacks!"],
        checkPossible: (gameObject)  => !gameObject.inventory.includes("roomkey"),
        nextNode: {
          text: ["Only for Guests"],
        },
      },
    ]
  }
}

export default kitchenLady