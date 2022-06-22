import Phaser from "phaser"


export function setKeyboard() {
  document
    .getElementsByTagName("body")[0]
    .addEventListener("keydown", (event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    })

  document
    .getElementsByTagName("body")[0]
    .addEventListener("keypress", (event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    })
}

export {}
