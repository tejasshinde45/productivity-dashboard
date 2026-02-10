export function realtiming() {
  function updateToday() {
    var now = new Date()

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var dayName = days[now.getDay()]

    var date = now.getDate()
    var month = now.getMonth() + 1
    var year = now.getFullYear()

    var hours = now.getHours()
    var minutes = now.getMinutes()
    var period = hours >= 12 ? "PM" : "AM"

    hours = hours % 12 || 12
    minutes = minutes < 10 ? "0" + minutes : minutes

    document.querySelector(".today h5:nth-child(1)").textContent = `${dayName},`
    document.querySelector(".today h5:nth-child(2)").textContent = `${date} / ${month} / ${year}`
    document.querySelector(".todays-time h2").textContent = `${hours}:${minutes} ${period}`
  }

  updateToday()

  setInterval(updateToday, 1000)

}