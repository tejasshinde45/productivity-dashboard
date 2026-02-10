export function weatherFunctionality() {

    var apiKey = 'b7994cc4e7de4187b1195700260902'
    var city = 'Mumbai'

    var weatherWrapper = document.querySelector('.weather-wrapper')

    var headerDate = document.querySelector('.weather-wrapper .left h2')
    var headerTime = document.querySelector('.weather-wrapper .left h1')
    var headerCity = document.querySelector('.weather-wrapper .left h4')

    var headerTemp = document.querySelector('.weather-wrapper .right h1')
    var headerInfo = document.querySelector('.weather-wrapper .right h5')

    var toast = document.querySelector('.context-toast')
    var lastToastMessage = ''

    function isHomePageActive() {
        return localStorage.getItem('activePage') === null
    }

    async function weatherAPICall(query) {
        try {
            var response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`
            )
            var data = await response.json()

            if (data.error) return

            headerCity.textContent = data.location.name
            headerTemp.textContent = `${data.current.temp_c}°C`

            headerInfo.innerHTML = `
                Condition: ${data.current.condition.text} <br>
                Humidity: ${data.current.humidity}% <br>
                Wind: ${data.current.wind_kph} km/h
            `
        } catch (err) {
            console.error('Weather API error', err)
        }
    }

    function initWeather() {
        if (!navigator.geolocation) {
            weatherAPICall(city)
            return
        }

        navigator.geolocation.getCurrentPosition(
            function (pos) {
                var lat = pos.coords.latitude
                var lon = pos.coords.longitude
                weatherAPICall(`${lat},${lon}`)
            },
            function () {
                weatherAPICall(city)
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
        )
    }

    initWeather()

    function showToast(message) {

        if (!document.querySelector('.weather-wrapper')) return
        if (!isHomePageActive()) {
            toast.classList.remove('show')
            return
        }

        if (message === lastToastMessage) return
        lastToastMessage = message

        toast.textContent = message
        toast.classList.add('show')

        setTimeout(() => {
            toast.classList.remove('show')
        }, 4000)
    }

    function updateBackground(hour24) {
        if (hour24 >= 5 && hour24 < 12) {
            weatherWrapper.style.backgroundImage = "url('./Images/morning.png')"
        }
        else if (hour24 >= 12 && hour24 < 17) {
            weatherWrapper.style.backgroundImage = "url('./Images/afternoon.png')"
        }
        else if (hour24 >= 17 && hour24 < 21) {
            weatherWrapper.style.backgroundImage = "url('./Images/evening.png')"
        }
        else {
            weatherWrapper.style.backgroundImage = "url('./Images/night.png')"
        }
    }

    function updateContext(hour24) {
        if (!isHomePageActive()) return
        let message = ''

        if (hour24 >= 5 && hour24 < 12) {
            message = 'Good Morning ☀️ Have a fresh start'
        }
        else if (hour24 >= 12 && hour24 < 17) {
            message = 'Stay Focused 💪 Keep going'
        }
        else if (hour24 >= 17 && hour24 < 21) {
            message = 'Good Evening 🌇 Slow things down'
        }
        else {
            message = 'Wind Down 🌙 Time to rest'
        }

        showToast(message)
    }

    function timeDate() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]

        var now = new Date()

        var day = days[now.getDay()]
        var tarik = now.getDate()
        var month = months[now.getMonth()]
        var year = now.getFullYear()

        var hours24 = now.getHours()
        var minutes = now.getMinutes()
        var seconds = now.getSeconds()

        headerDate.textContent = `${tarik} ${month} ${year}`

        var period = hours24 >= 12 ? 'PM' : 'AM'
        var hours12 = hours24 % 12 || 12

        headerTime.textContent =
            `${day}, ${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`

        updateContext(hours24)
        updateBackground(hours24)
    }

    timeDate()
    setInterval(timeDate, 1000)
}
