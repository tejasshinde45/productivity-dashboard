import { formatTime } from "./openfeature.js"

export function dailyPlanner() {
  var dayPlanner = document.querySelector('.day-planner')

  var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

  var hours = Array.from({ length: 18 }, (_, idx) => {
    var start = 6 + idx
    var end = start + 1
    return `${formatTime(start)} - ${formatTime(end)}`
  })

  var wholeDaySum = ''
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || ''

    wholeDaySum += `
      <div class="day-planner-time">
        <p>${elem}</p>
        <input id="${idx}" type="text" placeholder="..." value="${savedData}">
      </div>
    `
  })

  dayPlanner.innerHTML = wholeDaySum

  var dayplannerInput = document.querySelectorAll('.day-planner input')

  dayplannerInput.forEach(function (elem) {
    elem.addEventListener('input', function () {
      dayPlanData[elem.id] = elem.value
      localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
    })
  })
}
