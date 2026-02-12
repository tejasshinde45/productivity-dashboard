export function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var allFullPage = document.querySelectorAll('.fullElem')
    var allBackBtn = document.querySelectorAll('.backbtn')
    var ACTIVE_PAGE_KEY = 'activePage'

    function hideAllPages() {
        allFullPage.forEach(function (page) {
            page.style.display = 'none'
        })
    }

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            hideAllPages()
            allFullPage[elem.id].style.display = 'block'
            localStorage.setItem(ACTIVE_PAGE_KEY, elem.id)
        })
    })

    allBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullPage[back.id].style.display = 'none'
            localStorage.removeItem(ACTIVE_PAGE_KEY)
        })
    })

    hideAllPages()
    var savedPage = localStorage.getItem(ACTIVE_PAGE_KEY)
    if (savedPage !== null && allFullPage[savedPage]) {
        allFullPage[savedPage].style.display = 'block'
    }
}

export function formatTime(hour) {
    var period = hour >= 12 ? 'PM' : 'AM'
    var displayHour = hour % 12 || 12
    return `${displayHour}:00 ${period}`
}
