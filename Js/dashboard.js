export function flipClock() {
  setInterval(() => {
    const now = new Date()

    const seconds = now.getSeconds()
    const minutes = now.getMinutes()
    const hours = now.getHours()

    flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
    flip(document.querySelector("[data-hours-ones]"), hours % 10)

    flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
    flip(document.querySelector("[data-minutes-ones]"), minutes % 10)

    flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
    flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
  }, 1000)

  function flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector(".top")
    const startNumber = parseInt(topHalf.textContent)
    if (newNumber === startNumber) return

    const bottomHalf = flipCard.querySelector(".bottom")

    const topFlip = document.createElement("div")
    topFlip.classList.add("top-flip")

    const bottomFlip = document.createElement("div")
    bottomFlip.classList.add("bottom-flip")

    topFlip.textContent = startNumber
    bottomFlip.textContent = newNumber

    topFlip.addEventListener("animationstart", () => {
      topHalf.textContent = newNumber
    })

    topFlip.addEventListener("animationend", () => {
      topFlip.remove()
    })

    bottomFlip.addEventListener("animationend", () => {
      bottomHalf.textContent = newNumber
      bottomFlip.remove()
    })

    flipCard.append(topFlip, bottomFlip)
  }
}
