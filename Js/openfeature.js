export function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var allFullPage = document.querySelectorAll('.fullElem')
    var allBackBtn = document.querySelectorAll('.backbtn')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullPage[elem.id].style.display = 'block'
            localStorage.setItem('activePage', elem.id)
        })
    })

    allBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullPage[back.id].style.display = 'none'
            localStorage.removeItem('activePage')
        })
    })

    var savedPage = localStorage.getItem('activePage')
    if (savedPage !== null && allFullPage[savedPage]) {
        allFullPage[savedPage].style.display = 'block'
    }
}

export function formatTime(hour) {
    var period = hour >= 12 ? 'PM' : 'AM'
    var displayHour = hour % 12 || 12
    return `${displayHour}:00 ${period}`
}
